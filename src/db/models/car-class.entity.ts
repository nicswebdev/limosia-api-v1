import { ApiProperty } from '@nestjs/swagger';
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
export class CarClass {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty({ type: 'string', format: 'binary' })
  @Column()
  image: string;

  @ApiProperty()
  @Column({ type: 'text' })
  description: string;

  @ApiProperty()
  @Column({ default: 1 })
  max_guest: number;

  @ApiProperty()
  @Column({ default: 1 })
  max_suitcase: number;

  @ApiProperty()
  @CreateDateColumn()
  created_at: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updated_at: Date;

  @ApiProperty({ default: false })
  @Column({ default: false })
  delete_row: boolean;

  @OneToOne(() => PriceSchema, (priceSchema) => priceSchema.car_class)
  price_schema: PriceSchema;
}
