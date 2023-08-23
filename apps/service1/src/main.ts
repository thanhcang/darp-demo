import express, {Request, Response} from 'express';
import {DaprClient, HttpMethod} from "@dapr/dapr";
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

app.get('/test/service', async (req: Request, res: Response) => {
  try {
    // application call to dapr sidecar
    // with specified dapr port and host
    const daprHost = "127.0.0.1"; // Dapr Sidecar Host
    const daprPort = "3501"; // service 02

    const client = new DaprClient({daprHost, daprPort});

    const serviceAppId = "service_two";
    const serviceMethod = "listeners";

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

app.get('/test/inextia', async (req: Request, res: Response) => {
  try {
    // application call to dapr sidecar
    // with specified dapr port and host
    const daprHost = "localhost"; // Dapr Sidecar Host
    const daprPort = "3502"; // service 02

    const client = new DaprClient({daprHost, daprPort});

    const serviceAppId = "service-inextia";
    const serviceMethod = "test/inextia";

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
