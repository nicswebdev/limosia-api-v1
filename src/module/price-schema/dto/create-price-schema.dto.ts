import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { type } from 'os';

export class CreatePriceSchemaDto {
  @ApiPropertyOptional({ type: 'integer' })
  @Transform(({ value }) => parseInt(value))
  @IsNotEmpty()
  @IsInt()
  airport_id: number;

  @ApiPropertyOptional({ type: 'integer' })
  @Transform(({ value }) => parseInt(value))
  @IsNotEmpty()
  @IsInt()
  car_class_id: number;

  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsString()
  tier_name: string;

  @ApiPropertyOptional({ type: 'integer' })
  @Transform(({ value }) => parseInt(value))
  @IsNotEmpty()
  @IsInt()
  from_range_km: number;

  @ApiPropertyOptional({ type: 'integer' })
  @Transform(({ value }) => parseInt(value))
  @IsNotEmpty()
  @IsInt()
  to_range_km: number;

  @ApiPropertyOptional({ type: 'number', description: 'Float' })
  @Transform(({ value }) => parseFloat(value))
  @IsNotEmpty()
  @IsNumber()
  prebook_time_hour_1: number;

  @ApiPropertyOptional({ type: 'integer' })
  @Transform(({ value }) => parseInt(value))
  @IsNotEmpty()
  @IsInt()
  refundable_base_price_1: number;

  @ApiPropertyOptional({ type: 'integer' })
  @Transform(({ value }) => parseInt(value))
  @IsNotEmpty()
  @IsInt()
  non_refundable_base_price_1: number;

  @ApiPropertyOptional({ type: 'number', description: 'Float' })
  @Transform(({ value }) => (value !== null ? parseFloat(value) : null))
  @IsOptional()
  @IsNumber()
  prebook_time_hour_2: number | null;

  @ApiPropertyOptional({ type: 'integer' })
  @Transform(({ value }) => (value !== null ? parseInt(value) : null))
  @IsOptional()
  @IsInt()
  refundable_base_price_2: number | null;

  @ApiPropertyOptional({ type: 'integer' })
  @Transform(({ value }) => (value !== null ? parseFloat(value) : null))
  @IsOptional()
  @IsInt()
  non_refundable_base_price_2: number | null;

  // @ApiPropertyOptional({ type: 'integer' })
  // @Transform(({ value }) => parseInt(value))
  // @IsNotEmpty()
  // @IsInt()
  // base_price: number;
}
