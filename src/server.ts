import express from 'express';
import routes from './routes';

import './kafka/consumer';

const app = express();

app.use(routes);

app.use(express.json());

app.listen(3002, () => {
  console.log('Listening on port 3002.');
});
