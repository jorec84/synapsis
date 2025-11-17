import { Injectable } from '@nestjs/common';
import { SendMessageDto } from '../common/dto/send-message.dto';
import { ProducerService } from '../queue/producer.service';

/**
 * Servicio de la API encargado de manejar la lógica de envío de mensajes.
 * Se apoya en ProducerService para encolar en SQS.
 */
@Injectable()
export class ApiService {
  constructor(private readonly producerService: ProducerService) {}

  /**
   * Encola un mensaje en SQS y devuelve el ID asignado.
   * @param dto datos del mensaje (canal, destinatario, cuerpo, idempotencyKey)
   * @returns id del mensaje encolado
   */
  async sendMessage(dto: SendMessageDto): Promise<{ id: string; status: string }> {
    const messageId = await this.producerService.enqueue(dto);
    return { id: messageId, status: 'ENQUEUED' };
  }
}
