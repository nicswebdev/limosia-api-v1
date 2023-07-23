import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateCarClassDto {
  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ type: 'string', format: 'binary' })
  image: Express.Multer.File;

  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiPropertyOptional({ type: 'integer' })
  @Transform(({ value }) => parseInt(value))
  @IsNotEmpty({})
  @IsInt()
  max_guest: number;

  @ApiPropertyOptional({ type: 'integer' })
  @Transform(({ value }) => parseInt(value))
  @IsNotEmpty()
  @IsInt()
  max_suitcase: number;
}
