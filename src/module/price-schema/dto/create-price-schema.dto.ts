import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

import { IsInt, IsNotEmpty, IsString } from 'class-validator';

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

  @ApiPropertyOptional({ type: 'integer' })
  @Transform(({ value }) => parseInt(value))
  @IsNotEmpty()
  @IsInt()
  base_price: number;
}
