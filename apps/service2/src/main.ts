import express from 'express';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT_2 ? Number(process.env.PORT_2) : 3000;

const app = express();

app.get('/', (req, res) => {
  res.send({ message: 'Hello API- 2' });
});

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});

