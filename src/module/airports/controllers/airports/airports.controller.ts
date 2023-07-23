import { ApiPaginatedResponse, ApiSingleResponse } from '@/common/decorators';
import { PaginationQuery, PaginatedDto } from '@/common/dto';
import { Airports } from '@/db/models';
import {
  Controller,
  Delete,
  Get,
  Param,
  Query,
  UseFilters,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IPaginationOptions } from 'nestjs-typeorm-paginate';
import { AirportsService } from '../../services/airports/airports.service';
import { QueryNotFoundFilter } from '@/common/filters';

@ApiTags('airports')
@Controller('airports')
export class AirportsController {
  constructor(private readonly airportService: AirportsService) {}

  @Get()
  @ApiPaginatedResponse({
    model: Airports,
    apiOkDescription: 'The records has been successfully returned.',
    summary: 'Find all of existing Airports.',
  })
  findAll(
    @Query() paginationQuery: PaginationQuery,
  ): Promise<PaginatedDto<Airports>> {
    const { page, limit, search, sortBy } = paginationQuery;
    const options: IPaginationOptions & PaginationQuery = {
      page,
      limit,
      search,
      sortBy,
    };

    return this.airportService.findAllPaginate({ ...options });
  }

  @Get(':id')
  @UseFilters(QueryNotFoundFilter)
  @ApiSingleResponse({
    model: Airports,
    apiOkDescription: 'Successfully received model list',
    summary: 'Find single item of existing Airports.',
  })
  findOne(@Param('id') id: string) {
    return this.airportService.findOne(+id);
  }

  @Delete(':id')
  @ApiSingleResponse({
    model: Airports,
    apiOkDescription: 'The records has been successfully returned.',
    summary: 'Removed single item of existing Airports.',
  })
  remove(@Param('id') id: string) {
    return this.airportService.remove(+id);
  }
}
