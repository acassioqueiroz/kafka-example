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
    autoCommit: false,
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        partition,
        offset: message.offset,
        value: message?.value?.toString(),
      });
      await new Promise((resolve) => {
        setTimeout(resolve, 300);
      });
      if (partition === 0)
        consumer.commitOffsets([{ topic, partition, offset: message.offset }]);
    },
  });
  setTimeout(() => {
    consumer.seek({ topic: 'DocumentsEvents', partition: 0, offset: '80' });
  }, 20000);

  console.log(`Running kafka consumer.`);
};

kafkaConsumerListener();

export default kafkaConsumerListener;
