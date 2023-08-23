import express, {Request, Response} from 'express';
import {DaprClient, HttpMethod} from "@dapr/dapr";

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT_2 ? Number(process.env.PORT_2) : 3000;

const app = express();

app.get('/', (req, res) => {
  res.send({ message: 'Hello API- 2' });
});

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});

app.get('/listeners', async (req: Request, res: Response) => {
  // application call to dapr sidecar
  return res.json({
    msg : 'this is listeners'
  })
});

app.get('/test/service', async (req: Request, res: Response) => {
  try {
    // application call to dapr sidecar
    const daprHost = "127.0.0.1"; // Dapr Sidecar Host
    const daprPort = "3500"; // Dapr Sidecar Port of this Example Server

    const client = new DaprClient({daprHost, daprPort});

    const serviceAppId = "service_one";
    const serviceMethod = "test";

    const data = await client.invoker.invoke(serviceAppId, serviceMethod, HttpMethod.GET);
    return res.json({
      data : data
    })
  } catch (err) {
    console.log(err)
    return  res.json({
      msg : err.message
    })
  }

});

app.get('/server/test', async (req: Request, res: Response) => {
  // call to the server which is started by dapr
  // this server is started by darp
  const data = await fetch(`http://127.0.0.1:50051/my-custom-endpoint`);
  const json = await data.json();
  console.log(data)
  return res.json({
    data : json
  })
});
