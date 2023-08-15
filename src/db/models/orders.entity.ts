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

@Entity('orders')
export class Order {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

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

  @ApiProperty()
  @Column()
  payment_status: string;

  @ApiProperty()
  @Column()
  order_status: string;

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

  @ApiProperty({ type: () => Users })
  @ManyToOne(() => Users, (user) => user.order, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: number;
}
