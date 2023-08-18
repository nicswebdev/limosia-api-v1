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
import { Exclude, Expose } from 'class-transformer';
import { IsBoolean } from 'class-validator';

@Entity('order_statuses')
@Exclude()
export class OrderStatus {
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

  @OneToOne(() => Order, (order) => order.order_status)
  order: Order | number;
}
