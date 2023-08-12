import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class CreateGuestDto {
  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsDate()
  @IsString()
  dob: Date | null;

  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsString()
  address: string | null;

  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsString()
  city: string | null;

  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsString()
  state: string | null;

  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsString()
  zip_code: string | null;

  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsString()
  phone: string | null;
}
