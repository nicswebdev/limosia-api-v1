import { IsBoolean } from 'class-validator';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { Airports } from './airports.entity';
import { CarClass } from './car-class.entity';

@Entity()
export class PriceSchema {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Airports, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'airport_id' })
  airport: Airports;

  @OneToOne(() => CarClass, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'car_class_id' })
  car_class: CarClass;

  @Column()
  tier_name: string;

  @Column()
  range_km: string;

  @Column()
  base_price: string;

  @Column()
  rate: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ default: false })
  @IsBoolean()
  delete_row: boolean;
}
