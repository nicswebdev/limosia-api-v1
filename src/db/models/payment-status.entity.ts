import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Order } from './orders.entity';
import { IsBoolean } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';

@Entity('payment_statuses')
@Exclude()
export class PaymentStatus {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  @Expose()
  id: number;

  @ApiProperty()
  @Column({ unique: true })
  @Expose()
  name: string;

  @ApiProperty()
  @Column({ nullable: true })
  @Expose()
  description: string;

  @ApiProperty()
  @CreateDateColumn()
  created_at: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updated_at: Date;

  @ApiProperty()
  @Column({ default: false })
  @IsBoolean()
  delete_row: boolean;

  @ApiProperty()
  @OneToOne(() => Order, (order) => order.payment_status)
  order: Order | number;
}
