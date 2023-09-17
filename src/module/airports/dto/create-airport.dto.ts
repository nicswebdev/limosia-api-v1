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
  name_from_maps: string;

  @ApiPropertyOptional()
  @IsString()
  place_id: string;
}
