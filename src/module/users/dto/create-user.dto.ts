import { Guests } from '@/db/models';
import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  IsStrongPassword,
  Length,
  MinLength,
} from 'class-validator';
import { CreateGuestDto } from './create-guest.dto';

export class CreateUserDto {
  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsString()
  f_name: string;

  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsString()
  l_name: string;

  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsEmail()
  @Length(5, 50)
  @IsString()
  email: string;

  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsStrongPassword({
    minLength: 8,
    minNumbers: 1,
    minLowercase: 1,
    minUppercase: 1,
    minSymbols: 0,
  })
  @MinLength(8)
  @IsString()
  password: string;

  @ApiPropertyOptional({ type: CreateGuestDto })
  @IsOptional()
  @IsObject()
  guest?: Guests;
}
