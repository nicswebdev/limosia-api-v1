import { ApiPropertyOptional } from '@nestjs/swagger';

import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRoleDto {
  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsString()
  name: string;
}
