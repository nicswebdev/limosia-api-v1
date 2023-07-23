import { IsBoolean, IsEmail, Length } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Guests } from './guests.entity';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Guests, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'guest_id' })
  guest: Guests;

  @Column()
  f_name: string;

  @Column()
  l_name: string;

  @Column({
    unique: true,
  })
  @IsEmail()
  @Length(5, 50)
  email: string;

  @Column()
  phone: string;

  @Column({
    type: 'date',
    nullable: true,
  })
  dob: Date | null;

  @Column()
  address: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  zip_code: string;

  @Column()
  total_price: number;

  @Column()
  pickup_point: string;

  @Column()
  destination_point: string;

  @Column()
  range: string;

  @Column({
    type: 'date',
  })
  pickup_date: Date;

  @Column({
    type: 'time',
  })
  pickup_time: Date;

  @Column()
  flight_number: string;

  @Column()
  total_guest: number;

  @Column()
  car_class: string;

  @Column()
  price_schema: string;

  @Column()
  order_currency: string;

  @Column()
  payment_status: string;

  @Column()
  order_status: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ default: false })
  @IsBoolean()
  delete_row: boolean;
}
