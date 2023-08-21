import { ApiPropertyOptional } from '@nestjs/swagger';

import { IsNotEmpty, IsString } from 'class-validator';

export class CreateOrderStatusesDto {
  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsString()
  description: string;
}
