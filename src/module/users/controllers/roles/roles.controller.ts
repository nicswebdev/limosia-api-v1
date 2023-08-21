import { Role } from '@/db/models';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseFilters,
} from '@nestjs/common';
import { RolesService } from '../../services/roles/roles.service';
import { CreateRoleDto } from '../../dto/create-role.dto';
import {
  Roles,
  ApiPaginatedResponse,
  ApiSingleResponse,
} from '@/common/decorators';
import { PaginationQuery, PaginatedDto } from '@/common/dto';
import { RolesEnum } from '@/common/enums';
import { QueryFailedFilter, QueryNotFoundFilter } from '@/common/filters';
import { ApiTags, ApiOperation, ApiCreatedResponse } from '@nestjs/swagger';
import { IPaginationOptions } from 'nestjs-typeorm-paginate';

@ApiTags('Users', 'Roles')
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get()
  @Roles(RolesEnum.ADMIN)
  @UseFilters(QueryFailedFilter)
  @ApiPaginatedResponse({
    model: Role,
    apiOkDescription: 'The records has been successfully returned.',
    summary: 'Find all of existing Order Statuses.',
  })
  findAll(
    @Query() paginationQuery: PaginationQuery,
  ): Promise<PaginatedDto<Role>> {
    const { page, limit, search, sortBy } = paginationQuery;
    const options: IPaginationOptions & PaginationQuery = {
      page,
      limit,
      search,
      sortBy,
    };

    return this.rolesService.findAllPaginate(options);
  }

  @Post()
  @Roles(RolesEnum.ADMIN)
  @UseFilters(QueryFailedFilter)
  @ApiOperation({
    summary: 'Create a new Order Status.',
  })
  @ApiCreatedResponse({
    type: Role,
    description: 'The record has been successfully created.',
  })
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @Get(':id')
  @Roles(RolesEnum.ADMIN)
  @UseFilters(QueryNotFoundFilter, QueryFailedFilter)
  @ApiSingleResponse({
    model: Role,
    apiOkDescription: 'Successfully received model list',
    summary: 'Find single item of existing Order Statuses.',
  })
  findOne(@Param('id') id: string) {
    return this.rolesService.findOne(+id);
  }
}
