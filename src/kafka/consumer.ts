import { Kafka } from 'kafkajs';

const kafkaConsumerListener = async (): Promise<void> => {
  const kafka = new Kafka({
    clientId: 'kafka-example-consumer',
    brokers: ['10.0.0.119:9092'],
  });
  const consumer = kafka.consumer({ groupId: 'search-engine' });
  await consumer.connect();
  await consumer.subscribe({ topic: 'DocumentsEvents', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ partition, message }) => {
      console.log({
        partition,
        offset: message.offset,
        value: message?.value?.toString(),
      });
    },
  });

  console.log(`Running kafka consumer.`);
};

kafkaConsumerListener();

export default kafkaConsumerListener;
