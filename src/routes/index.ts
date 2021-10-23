import { Router } from 'express';
import { Kafka } from 'kafkajs';

const routes = Router();

let inc = -1;

interface IPartition {
  [key: number]: number;
}

const partition: IPartition = {
  0: 0,
  1: 0,
  2: 0,
};

const kafka = new Kafka({
  clientId: 'kafka-example',
  brokers: ['10.0.0.119:9092'],
});
const producer = kafka.producer();
producer.connect();

routes.use('/producer', async (request, response) => {
  partition[inc % 3] += 1;
  inc += 1;
  await producer.send({
    topic: 'DocumentsEvents',
    messages: [
      {
        value: `Hello KafkaJS user! ${partition[inc % 3]}`,
        partition: inc % 3,
      },
    ],
  });

  return response.json({ partition: inc % 3, value: partition[inc % 3] });
});

export default routes;
