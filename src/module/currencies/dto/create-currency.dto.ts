import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateCurrencyDto {
  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiPropertyOptional({ type: 'integer' })
  @Transform(({ value }) => parseInt(value))
  @IsNotEmpty({})
  @IsInt()
  rate: number;
}
