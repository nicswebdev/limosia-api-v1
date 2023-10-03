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

  @Get(':airport_id/:range/:prebook')
  @UseFilters(QueryFailedFilter)
  findAllByAirportId(
    @Param('airport_id') airport_id: number,
    @Param('range') range: number,
    @Param('prebook') prebook: number,
  ) {
    return this.priceSchemaService.findAllByAirportIdAndRange(
      airport_id,
      range,
      prebook
    );
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

  @Get('/single/:airport_id/:car_class_id/:range/:prebook')
  @UseFilters(QueryNotFoundFilter, QueryFailedFilter)
  @ApiSingleResponse({
    model: PriceSchema,
    apiOkDescription: 'Successfully received model list',
    summary: 'Find single item of existing Price Schemas.',
  })
  findOneByAirportCarClassRange(
    @Param('airport_id') airport_id: number,
    @Param('car_class_id') car_class_id: number,
    @Param('range') range: number,
    @Param('prebook') prebook:number
  ) {
    return this.priceSchemaService.findOneByAirportCarClassRange(
      +airport_id,
      +car_class_id,
      +range,
      prebook
    );
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
