import { SQSClient, SendMessageCommand } from '@aws-sdk/client-sqs';
import { randomUUID } from 'crypto';
import { SendMessageDto } from '../common/dto/send-message.dto';

const sqs = new SQSClient({});

export class ProducerService {
  async enqueue(dto: SendMessageDto): Promise<string> {
    const id = randomUUID();
    const command = new SendMessageCommand({
      QueueUrl: process.env.SQS_QUEUE_URL!,
      MessageBody: JSON.stringify({ id, ...dto }),
      MessageGroupId: 'default',
      MessageDeduplicationId: dto.idempotencyKey ?? id,
    });
    await sqs.send(command);
    return id;
  }
}
