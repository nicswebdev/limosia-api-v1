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
import { CurrenciesService } from '../../services/currencies/currencies.service';
import { Currency } from '@/db/models';
import { ApiPaginatedResponse, ApiSingleResponse } from '@/common/decorators';
import { PaginationQuery, PaginatedDto } from '@/common/dto';
import { QueryNotFoundFilter } from '@/common/filters';
import { IPaginationOptions } from 'nestjs-typeorm-paginate';
import { CreateCurrencyDto, UpdateCurrencyDto } from '../../dto';

@ApiTags('Currencies')
@Controller('currencies')
export class CurrenciesController {
  constructor(private readonly currenciesService: CurrenciesService) {}

  @Get()
  @ApiPaginatedResponse({
    model: Currency,
    apiOkDescription: 'The records has been successfully returned.',
    summary: 'Find all of existing Currencies.',
  })
  findAll(
    @Query() paginationQuery: PaginationQuery,
  ): Promise<PaginatedDto<Currency>> {
    const { page, limit, search, sortBy } = paginationQuery;
    const options: IPaginationOptions & PaginationQuery = {
      page,
      limit,
      search,
      sortBy,
    };

    return this.currenciesService.findAllPaginate({ ...options });
  }

  @Post()
  @ApiOperation({
    summary: 'Create a new Currency.',
  })
  @ApiCreatedResponse({
    type: Currency,
    description: 'The record has been successfully created.',
  })
  create(@Body() createCurrencyDto: CreateCurrencyDto) {
    return this.currenciesService.create(createCurrencyDto);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update existing Currency by ID.',
  })
  @ApiCreatedResponse({
    type: Currency,
    description: 'The record has been successfully updated.',
  })
  update(
    @Param('id') id: string,
    @Body() updateCurrencyDto: UpdateCurrencyDto,
  ) {
    return this.currenciesService.update(+id, updateCurrencyDto);
  }

  @Get(':id')
  @UseFilters(QueryNotFoundFilter)
  @ApiSingleResponse({
    model: Currency,
    apiOkDescription: 'Successfully received model list',
    summary: 'Find single item of existing Currencies.',
  })
  findOne(@Param('id') id: string) {
    return this.currenciesService.findOne(+id);
  }

  @Delete(':id')
  @ApiSingleResponse({
    model: Currency,
    apiOkDescription: 'The records has been successfully returned.',
    summary: 'Removed single item of existing Currencies.',
  })
  remove(@Param('id') id: string) {
    return this.currenciesService.remove(+id);
  }
}
