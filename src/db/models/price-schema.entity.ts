import { IsBoolean, IsInt } from 'class-validator';
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

@Entity()
export class PriceSchema {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ type: Airports })
  @ManyToOne(() => Airports, (airport) => airport.price_schema, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'airport_id' })
  @IsInt()
  airport: Airports | number;

  @ApiProperty({ type: CarClass })
  @ManyToOne(() => CarClass, (carClass) => carClass.price_schema, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'car_class_id' })
  @IsInt()
  car_class: CarClass | number;

  @ApiProperty()
  @Column()
  tier_name: string;

  @ApiProperty()
  @Column({ default: 0 })
  @IsInt()
  range_km: number;

  @ApiProperty()
  @Column({ default: 0 })
  @IsInt()
  base_price: number;

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
