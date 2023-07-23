import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAirportDto {
  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsString()
  latitude: string;

  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsString()
  longitude: string;
}
