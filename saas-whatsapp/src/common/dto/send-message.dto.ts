import { IsEnum, IsString, IsNotEmpty, IsPhoneNumber } from 'class-validator';

export enum Channel {
  SMS = 'SMS',
  WHATSAPP = 'WHATSAPP',
}

export class SendMessageDto {
  @IsEnum(Channel)
  channel: Channel;

  @IsPhoneNumber('PE')
  to: string;

  @IsString()
  @IsNotEmpty()
  body: string;

  idempotencyKey?: string;
}
