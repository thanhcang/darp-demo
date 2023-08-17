import express from 'express';
import {HttpMethod} from "@dapr/dapr";
import {DaprIntegrationService} from "@project/darp";

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT_1 ? Number(process.env.PORT_1) : 3000;

const app = express();


app.get('/', (req, res) => {
  res.send({ message: 'Hello API' });
});

app.get('/test', (req, res) => {
  res.send({ message: 'Hello API' });
});

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
