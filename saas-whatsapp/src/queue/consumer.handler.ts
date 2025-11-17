import { SQSHandler } from 'aws-lambda';
import { DataSource } from 'typeorm';
import { Message, MessageStatus } from '../common/entities/message.entity';
import { ormConfig } from '../db/ormconfig';

let ds: DataSource;

async function getDs() {
  if (!ds) {
    ds = await new DataSource(ormConfig).initialize();
  }
  return ds;
}

export const handle: SQSHandler = async (event) => {
  const datasource = await getDs();
  const repo = datasource.getRepository(Message);

  for (const record of event.Records) {
    const payload = JSON.parse(record.body);
    const message = repo.create({
      id: payload.id,
      to: payload.to,
      body: payload.body,
      channel: payload.channel,
      status: MessageStatus.PENDING,
    });
    await repo.save(message);
  }
};
