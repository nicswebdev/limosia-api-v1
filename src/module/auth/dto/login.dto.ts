import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsString()
  password: string;
}
