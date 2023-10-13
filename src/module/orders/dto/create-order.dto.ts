import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

import {
  IsDateString,
  IsInt,
  IsMilitaryTime,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateOrderDto {
  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsString()
  order_no: string;

  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsString()
  f_name: string;

  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsString()
  l_name: string;

  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsString()
  phone: string;

  @ApiPropertyOptional({ default: '2023-08-15' })
  @IsNotEmpty()
  @IsDateString()
  dob: Date;

  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsString()
  address: string;

  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsString()
  city: string;

  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsString()
  state: string;

  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsString()
  zip_code: string;

  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsString()
  pickup_point: string;

  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsString()
  destination_point: string;

  @ApiPropertyOptional({ default: '2023-08-15' })
  @IsNotEmpty()
  @IsDateString()
  pickup_date: Date;

  @ApiPropertyOptional({ default: '10:59', description: 'Only HH:MM' })
  @IsNotEmpty()
  @IsMilitaryTime()
  pickup_time: Date;

  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsString()
  flight_number: string;

  @ApiPropertyOptional({ type: 'integer' })
  @Transform(({ value }) => parseInt(value))
  @IsNotEmpty()
  @IsInt()
  total_guest: number;

  @ApiPropertyOptional({ type: 'integer' })
  @Transform(({ value }) => parseInt(value))
  @IsNotEmpty()
  @IsInt()
  total_suitcase: number;

  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsString()
  car_class_name: string;

  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsString()
  airport_name: string;

  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsNumber()
  car_class_id: number;

  @ApiPropertyOptional({ type: 'integer' })
  @Transform(({ value }) => parseInt(value))
  @IsNotEmpty()
  @IsInt()
  range: number;

  @ApiPropertyOptional({ type: 'integer' })
  @Transform(({ value }) => parseInt(value))
  @IsNotEmpty()
  @IsInt()
  total_price: number;

  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsString()
  price_schema_name: string;

  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsString()
  order_currency: string;

  @ApiPropertyOptional({ type: 'integer' })
  @Transform(({ value }) => parseInt(value))
  @IsNotEmpty()
  @IsInt()
  payment_status_id: number;

  @ApiPropertyOptional({ type: 'integer' })
  @Transform(({ value }) => parseInt(value))
  @IsNotEmpty()
  @IsInt()
  order_status_id: number;
}
