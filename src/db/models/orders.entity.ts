import { IsBoolean } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Users } from './users.entity';
import { PaymentStatus } from './payment-status.entity';
import { OrderStatus } from './order-status.entity';
import { Exclude } from 'class-transformer';
import { PriceSchema } from './price-schema.entity';
import { CarClass } from './car-class.entity';

@Entity('orders')
export class Order {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @ApiProperty({ type: () => Users })
  @ManyToOne(() => Users, (user) => user.order, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: Users;

  @ApiProperty()
  @Column({
    unique: true,
  })
  order_no: string;

  @ApiProperty()
  @Column()
  f_name: string;

  @ApiProperty()
  @Column()
  l_name: string;

  @ApiProperty()
  @Column()
  email: string;

  @ApiProperty()
  @Column()
  phone: string;

  @ApiProperty()
  @Column({
    type: 'date',
    nullable: true,
  })
  dob: Date | null;

  @ApiProperty()
  @Column()
  address: string;

  @ApiProperty()
  @Column()
  city: string;

  @ApiProperty()
  @Column()
  state: string;

  @ApiProperty()
  @Column()
  zip_code: string;

  @ApiProperty()
  @Column()
  pickup_point: string;

  @ApiProperty()
  @Column()
  destination_point: string;

  @ApiProperty()
  @Column({
    type: 'date',
  })
  pickup_date: Date;

  @ApiProperty()
  @Column({
    type: 'time',
  })
  pickup_time: Date;

  @ApiProperty()
  @Column()
  flight_number: string;

  @ApiProperty()
  @Column()
  total_guest: number;

  @ApiProperty()
  @Column()
  total_suitcase: number;

  @ApiProperty()
  @Column()
  car_class_name: string;

  @ApiProperty()
  @Column()
  airport_name: string;

  @ApiProperty()
  @Column()
  range: number;

  @ApiProperty()
  @Column()
  total_price: number;

  @ApiProperty()
  @Column()
  price_schema_name: string;

  @ApiProperty()
  @Column()
  order_currency: string;

  @Column({ nullable: true })
  @Exclude()
  payment_status_id: number;

  @ApiProperty({ type: () => PaymentStatus })
  @ManyToOne(() => PaymentStatus, (payment) => payment.order)
  @JoinColumn({ name: 'payment_status_id' })
  payment_status: PaymentStatus;

  @Column({ nullable: true })
  @Exclude()
  order_status_id: number;

  @ApiProperty({ type: () => OrderStatus })
  @ManyToOne(() => OrderStatus, (order) => order.order)
  @JoinColumn({ name: 'order_status_id' })
  order_status: OrderStatus;

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

  @Column()
  @Exclude()
  car_class_id: number;

  @ApiProperty({ type: () => CarClass })
  @ManyToOne(() => CarClass, (carclass) => carclass.id)
  @JoinColumn({ name: 'car_class_id' })
  car_class: CarClass;
}
