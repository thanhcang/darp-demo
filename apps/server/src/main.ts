import express from 'express';
import {CommunicationProtocolEnum, DaprServer} from "@dapr/dapr";
import * as Process from "process";

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.SERVER_PORT) : 3000;

const app = express();

app.get('/', (req, res) => {
  res.send({ message: 'Hello API' });
});

app.get('/my-custom-endpoint', (req, res) => {
  res.send({ msg: "My own express app!" });
})

const daprHost = Process.env.HOST; // Dapr Sidecar Host
const daprPort = "3500"; // Dapr Sidecar Port of this Example Server
const serverHost = Process.env.HOST; // App Host of this Example Server
const serverPort = "50051"; // App Port of this Example Server


const server = new DaprServer({
  serverHost,
  serverPort,
  serverHttp: app,
  communicationProtocol: CommunicationProtocolEnum.HTTP,
  clientOptions: {
    daprHost,
    daprPort,
  },
});
// dapr run --app-id server --app-port 50051 --app-protocol http -- nx serve server
// dapr run --app-id server --app-protocol http --app-port 50001 --dapr-http-port 3500 nx serve server
// dapr run --app-id server --app-protocol http --app-port 50001 --dapr-http-port 3500 --components-path ./components nx serve server
async function start() {
  await server.start();
}

start().then(r => {
  console.log(r)
  // process.exit(1);
}) ;

// app.listen(port, host, () => {
//   console.log(`[ ready ] http://${host}:${port}`);
// });
