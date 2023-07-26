import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PriceSchema } from './price-schema.entity';

@Entity()
export class Airports {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  latitude: string;

  @ApiProperty()
  @Column()
  longitude: string;

  @ApiProperty()
  @CreateDateColumn()
  created_at: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updated_at: Date;

  @ApiProperty({ default: false })
  @Column({ default: false })
  @IsBoolean()
  delete_row: boolean;

  @OneToOne(() => PriceSchema, (priceSchema) => priceSchema.airport)
  price_schema: PriceSchema;
}
