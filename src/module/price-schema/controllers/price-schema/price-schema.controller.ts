import { ApiPaginatedResponse, ApiSingleResponse } from '@/common/decorators';
import { PaginationQuery, PaginatedDto } from '@/common/dto';
import { QueryNotFoundFilter } from '@/common/filters';
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

@ApiTags('Price Schema')
@Controller('price-schema')
export class PriceSchemaController {
  constructor(private readonly priceSchemaService: PriceSchemaService) {}

  @Get()
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

    return this.priceSchemaService.findAllPaginate({ ...options });
  }

  @Post()
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
  @UseFilters(QueryNotFoundFilter)
  @ApiSingleResponse({
    model: PriceSchema,
    apiOkDescription: 'Successfully received model list',
    summary: 'Find single item of existing Price Schemas.',
  })
  findOne(@Param('id') id: string) {
    return this.priceSchemaService.findOne(+id);
  }

  @Delete(':id')
  @ApiSingleResponse({
    model: PriceSchema,
    apiOkDescription: 'The records has been successfully returned.',
    summary: 'Removed single item of existing Price Schemas.',
  })
  remove(@Param('id') id: string) {
    return this.priceSchemaService.remove(+id);
  }
}
