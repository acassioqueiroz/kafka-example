import express from 'express';

const app = express();

app.use('/', (requst, response) => {
  return response.json({ teste: 'ok' });
});

app.use(express.json());

app.listen(3002, () => {
  console.log('Listening on port 3002.');
});
