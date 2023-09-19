import {
  ApiPaginatedResponse,
  ApiSingleResponse,
  Roles,
} from '@/common/decorators';
import { PaginationQuery, PaginatedDto } from '@/common/dto';
import { QueryFailedFilter, QueryNotFoundFilter } from '@/common/filters';
import { PriceSchema } from '@/db/models';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseFilters,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { IPaginationOptions } from 'nestjs-typeorm-paginate';
import { CreatePriceSchemaDto, UpdatePriceSchemaDto } from '../../dto';
import { PriceSchemaService } from '../../services/price-schema/price-schema.service';
import { RolesEnum } from '@/common/enums';

@ApiTags('Price Schema')
@Controller('price-schema')
export class PriceSchemaController {
  constructor(private readonly priceSchemaService: PriceSchemaService) {}

  @Get()
  @UseFilters(QueryFailedFilter)
  @ApiPaginatedResponse({
    model: PriceSchema,
    apiOkDescription: 'The records has been successfully returned.',
    summary: 'Find all of existing Price Schemas.',
  })
  findAll(
    @Query() paginationQuery: PaginationQuery,
  ): Promise<PaginatedDto<PriceSchema>> {
    const { page, limit, search, sortBy } = paginationQuery;
    const options: IPaginationOptions & PaginationQuery = {
      page,
      limit,
      search,
      sortBy,
    };

    return this.priceSchemaService.findAllPaginate(options);
  }

  @Post()
  @Roles(RolesEnum.ADMIN)
  @UseFilters(QueryFailedFilter)
  @ApiOperation({
    summary: 'Create a new Price Schema.',
  })
  @ApiCreatedResponse({
    type: PriceSchema,
    description: 'The record has been successfully created.',
  })
  create(@Body() createPriceSchemaDto: CreatePriceSchemaDto) {
    return this.priceSchemaService.create(createPriceSchemaDto);
  }

  @Patch(':id')
  @Roles(RolesEnum.ADMIN)
  @UseFilters(QueryFailedFilter)
  @ApiOperation({
    summary: 'Update existing Price Schema by ID.',
  })
  @ApiCreatedResponse({
    type: PriceSchema,
    description: 'The record has been successfully updated.',
  })
  update(
    @Param('id') id: string,
    @Body() updatePriceSchemaDto: UpdatePriceSchemaDto,
  ) {
    return this.priceSchemaService.update(+id, updatePriceSchemaDto);
  }

  @Get(':id')
  @UseFilters(QueryNotFoundFilter, QueryFailedFilter)
  @ApiSingleResponse({
    model: PriceSchema,
    apiOkDescription: 'Successfully received model list',
    summary: 'Find single item of existing Price Schemas.',
  })
  findOne(@Param('id') id: string) {
    return this.priceSchemaService.findOne(+id);
  }

  @Get('/by_car_class_and_airport/:car_class_id/:airport_id')
  @UseFilters(QueryNotFoundFilter, QueryFailedFilter)
  @ApiSingleResponse({
    model: PriceSchema,
    apiOkDescription: 'Successfully received model list',
    summary: 'Find single item of existing Price Schemas.',
  })
  findOneByCarClassIdAndAirportId(@Param('car_class_id') car_id: string, @Param('airport_id') airport_id:string) {
    return this.priceSchemaService.findOneByCarClassIdAndAirportId(+car_id, +airport_id);
  }

  @Delete(':id')
  @Roles(RolesEnum.ADMIN)
  @UseFilters(QueryFailedFilter)
  @ApiSingleResponse({
    model: PriceSchema,
    apiOkDescription: 'The records has been successfully returned.',
    summary: 'Removed single item of existing Price Schemas.',
  })
  remove(@Param('id') id: string) {
    return this.priceSchemaService.remove(+id);
  }
}
