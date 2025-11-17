import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export enum MessageStatus {
  PENDING = 'PENDING',
  DELIVERED = 'DELIVERED',
}

@Entity('messages')
export class Message {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  channel: string;

  @Column()
  to: string;

  @Column()
  body: string;

  @Column({ default: MessageStatus.PENDING })
  status: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
