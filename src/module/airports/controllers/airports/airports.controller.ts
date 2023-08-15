import {
  ApiPaginatedResponse,
  ApiSingleResponse,
  Roles,
} from '@/common/decorators';
import { PaginationQuery, PaginatedDto } from '@/common/dto';
import { Airports } from '@/db/models';
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
import { AirportsService } from '../../services/airports/airports.service';
import { QueryFailedFilter, QueryNotFoundFilter } from '@/common/filters';
import { CreateAirportDto, UpdateAirportDto } from '../../dto';
import { RolesEnum } from '@/common/enums';

@ApiTags('Airports')
@Controller('airports')
export class AirportsController {
  constructor(private readonly airportService: AirportsService) {}

  @Get()
  @UseFilters(QueryFailedFilter)
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

    return this.airportService.findAllPaginate(options);
  }

  @Post()
  @Roles(RolesEnum.ADMIN)
  @UseFilters(QueryFailedFilter)
  @ApiOperation({
    summary: 'Create a new Airport.',
  })
  @ApiCreatedResponse({
    type: Airports,
    description: 'The record has been successfully created.',
  })
  create(@Body() createAirportDto: CreateAirportDto) {
    return this.airportService.create(createAirportDto);
  }

  @Patch(':id')
  @Roles(RolesEnum.ADMIN)
  @UseFilters(QueryFailedFilter)
  @ApiOperation({
    summary: 'Update existing Airport by ID.',
  })
  @ApiCreatedResponse({
    type: Airports,
    description: 'The record has been successfully updated.',
  })
  update(@Param('id') id: string, @Body() updateAirportDto: UpdateAirportDto) {
    return this.airportService.update(+id, updateAirportDto);
  }

  @Get(':id')
  @UseFilters(QueryNotFoundFilter, QueryFailedFilter)
  @ApiSingleResponse({
    model: Airports,
    apiOkDescription: 'Successfully received model list',
    summary: 'Find single item of existing Airports.',
  })
  findOne(@Param('id') id: string) {
    return this.airportService.findOne(+id);
  }

  @Delete(':id')
  @Roles(RolesEnum.ADMIN)
  @UseFilters(QueryFailedFilter)
  @ApiSingleResponse({
    model: Airports,
    apiOkDescription: 'The records has been successfully returned.',
    summary: 'Removed single item of existing Airports.',
  })
  remove(@Param('id') id: string) {
    return this.airportService.remove(+id);
  }
}
