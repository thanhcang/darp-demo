import express from 'express';
import {DaprClient, HttpMethod} from "@dapr/dapr";

const host = process.env.HOST ?? 'localhost';
const port = process.env.SUB_2_PORT ? Number(process.env.SUB_2_PORT) : 3000;

const app = express();
app.use(express.json({ limit: '10mb' }), express.urlencoded({ limit: '10mb', extended: true }));

app.get('/', (req, res) => {
  res.send({ message: 'This is subscriber 02' });
});

app.get('/send-events', async (req, res) => {
  try {
    const daprHost = "localhost"; // Dapr Sidecar Host
    const daprPort = "3504"; // publisher service

    const client = new DaprClient({daprHost, daprPort});

    const payload: { orderId: number; name: string } = {
      'orderId' : 1,
      'name' : 'order 1'
    };

    const data = await client.pubsub.publish(
      'order-pub-sub',
      'orders',
      payload
    );

    return res.json({
      data: payload
    })
  } catch (err) {
    console.log(err)
    return res.json({
      msg: err.message
    })
  }
});


app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
