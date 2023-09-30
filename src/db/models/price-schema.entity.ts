import { IsBoolean, IsInt, IsNumber } from 'class-validator';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Airports } from './airports.entity';
import { CarClass } from './car-class.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

@Entity()
export class PriceSchema {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  @Exclude()
  airport_id: number;

  @ApiProperty({ type: () => Airports })
  @ManyToOne(() => Airports, (airport) => airport.price_schema, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'airport_id' })
  airport: Airports;

  @Column({ nullable: true })
  @Exclude()
  car_class_id: number;

  @ApiProperty({ type: () => CarClass })
  @ManyToOne(() => CarClass, (carClass) => carClass.price_schema, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'car_class_id' })
  car_class: CarClass;

  @ApiProperty()
  @Column()
  tier_name: string;

  @ApiProperty()
  @Column({ default: 0 })
  @IsInt()
  from_range_km: number;

  @ApiProperty()
  @Column({ default: 0 })
  @IsInt()
  to_range_km: number;

  @ApiProperty()
  @Column({ default: 0 })
  @IsNumber()
  prebook_time_hour_1: number;

  @ApiProperty()
  @Column({ default: 0 })
  @IsInt()
  refundable_base_price_1: number;

  @ApiProperty()
  @Column({ default: 0 })
  @IsInt()
  non_refundable_base_price_1: number;

  @ApiProperty()
  @Column()
  @IsNumber()
  prebook_time_hour_2: number | null;

  @ApiProperty()
  @Column()
  @IsInt()
  refundable_base_price_2: number | null;

  @ApiProperty()
  @Column()
  @IsInt()
  non_refundable_base_price_2: number | null;

  // @ApiProperty()
  // @Column({ default: 0 })
  // @IsInt()
  // base_price: number;

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
}
