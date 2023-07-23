import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, IsOptional, IsString } from 'class-validator';
import { IPaginationMeta } from 'nestjs-typeorm-paginate';
import { FindOptionsOrderValue } from 'typeorm';

export class PaginatedDto<TData> {
  statusCode: number;
  message: string;
  items: TData[];
  meta: IPaginationMeta;
}

enum SortsEnum {
  ASC = 'ASC',
  DESC = 'DESC',
}

export class PaginationQuery {
  @ApiPropertyOptional({
    minimum: 1,
    maximum: 10000,
    title: 'Page',
    exclusiveMaximum: true,
    exclusiveMinimum: true,
    format: 'int32',
    default: 1,
  })
  @Transform(({ value }) => parseInt(value))
  @IsInt()
  page: number;

  @ApiPropertyOptional({ default: 10 })
  @Transform(({ value }) => parseInt(value))
  @IsInt()
  limit: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  search: string;

  @ApiPropertyOptional({
    enum: SortsEnum,
    default: SortsEnum.ASC,
  })
  @IsOptional()
  @IsString()
  sortBy: FindOptionsOrderValue;
}
