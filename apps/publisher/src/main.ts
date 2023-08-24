import express from 'express';
import {DaprClient, HttpMethod} from "@dapr/dapr";

const host = process.env.HOST ?? 'localhost';
const port = process.env.PUB_PORT ? Number(process.env.PUB_PORT) : 3000;

const app = express();
app.use(express.json({ limit: '10mb' }), express.urlencoded({ limit: '10mb', extended: true }));

app.get('/', (req, res) => {
  res.send({ message: 'This is a publisher' });
});


app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
