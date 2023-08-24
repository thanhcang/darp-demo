import express from 'express';

const host = process.env.HOST ?? 'localhost';
const port = process.env.SUB_1_PORT ? Number(process.env.SUB_1_PORT) : 3000;

const app = express();

app.use(express.json({ limit: '10mb' }), express.urlencoded({ limit: '10mb', extended: true }));

app.get('/', (req, res) => {
  res.send({ message: 'This is subscriber 01' });
});

app.get('/dapr/subscribe', (req, res) => {
  res.json([
    {
      pubsubname: "pubsub",
      topic: "orders",
      routes: {
        // rules: [
        //   {
        //     match: 'event.type == "order"',
        //     path: '/orders'
        //   },
        // ],
        default: '/products'
      }
    },
    {
      pubsubname: "pubsub",
      topic: "checkout",
      routes: {
        // rules: [
        //   {
        //     match: 'event.type == "order"',
        //     path: '/orders'
        //   },
        // ],
        default: '/orders'
      }
    }
  ]);
})


app.post('/orders', (req, res) => {
  console.log("this is the checkout topic");
  console.log(req.body);
  res.sendStatus(200);
});

app.post('/products', (req, res) => {
  console.log(req.body);
  console.log(req.path);
  res.sendStatus(200);
});

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
  // subscribeTopic()
});
