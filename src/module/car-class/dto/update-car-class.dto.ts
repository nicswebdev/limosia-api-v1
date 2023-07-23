import { ApiPropertyOptional } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';
import { CreateCarClassDto } from './create-car-class.dto';
import { IsOptional, IsNotEmpty } from 'class-validator';

export class UpdateCarClassDto extends PartialType(CreateCarClassDto) {
  @ApiPropertyOptional()
  @IsOptional()
  @IsNotEmpty({ always: false })
  name: string;

  @ApiPropertyOptional({ type: 'string', format: 'binary' })
  @IsOptional()
  image: Express.Multer.File;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNotEmpty({ always: false })
  description: string;

  @ApiPropertyOptional({ type: 'integer' })
  @IsOptional()
  @IsNotEmpty({ always: false })
  max_guest: number;

  @ApiPropertyOptional({ type: 'integer' })
  @IsOptional()
  @IsNotEmpty({ always: false })
  max_suitcase: number;
}
