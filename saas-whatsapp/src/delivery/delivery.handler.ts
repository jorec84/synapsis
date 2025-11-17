import { Handler } from 'aws-lambda';
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

export const handle: Handler = async (event) => {
  const id = event?.detail?.id || event.id;
  const datasource = await get