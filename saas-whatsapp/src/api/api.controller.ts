import { APIGatewayProxyHandlerV2 } from 'aws-lambda';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { SendMessageDto } from '../common/dto/send-message.dto';
import { ProducerService } from '../queue/producer.service';

const producer = new ProducerService();

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  const body = event.body ? JSON.parse(event.body) : {};
  const dto = plainToClass(SendMessageDto, body);
  const errors = await validate(dto);

  if (errors.length) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Validation failed' }) };
  }

  const messageId = await producer.enqueue(dto);
  return { statusCode: 202, body: JSON.stringify({ id: messageId, status: 'ENQUEUED' }) };
};
