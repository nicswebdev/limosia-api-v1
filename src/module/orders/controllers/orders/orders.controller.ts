import {
  ApiPaginatedResponse,
  ApiSingleResponse,
  AuthUser,
  Roles,
} from '@/common/decorators';
import { PaginationQuery, PaginatedDto } from '@/common/dto';
import { Order } from '@/db/models';
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseFilters,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { IPaginationOptions } from 'nestjs-typeorm-paginate';
import { OrdersService } from '../../services/orders/orders.service';
import { RolesEnum } from '@/common/enums';
import { CreateOrderDto, UpdateOrderDto } from '../../dto';
import { QueryFailedFilter, QueryNotFoundFilter } from '@/common/filters';
import { AuthUserExpress } from '@/common/types';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly orderService: OrdersService) {}

  @Get('me')
  @Roles(RolesEnum.USER, RolesEnum.ADMIN)
  @UseFilters(QueryNotFoundFilter, QueryFailedFilter)
  @ApiSingleResponse({
    model: Order,
    apiOkDescription: 'Successfully received model list',
    summary: "Find all current logged in user's existing Orders.",
  })
  findMyOrders(
    @AuthUser() user: AuthUserExpress,
    @Query() paginationQuery: PaginationQuery,
  ): Promise<PaginatedDto<Order>> {
    const { page, limit, search, sortBy } = paginationQuery;
    const options: IPaginationOptions & PaginationQuery = {
      page,
      limit,
      search,
      sortBy,
    };

    return this.orderService.findMyOrders(user, options);
  }

  @Get()
  @Roles(RolesEnum.ADMIN)
  @UseFilters(QueryFailedFilter)
  @ApiPaginatedResponse({
    model: Order,
    apiOkDescription: 'The records has been successfully returned.',
    summary: 'Find all of existing Orders.',
  })
  findAll(
    @Query() paginationQuery: PaginationQuery,
  ): Promise<PaginatedDto<Order>> {
    const { page, limit, search, sortBy } = paginationQuery;
    const options: IPaginationOptions & PaginationQuery = {
      page,
      limit,
      search,
      sortBy,
    };

    return this.orderService.findAllPaginate(options);
  }

  @Post()
  @Roles(RolesEnum.USER, RolesEnum.ADMIN)
  @UseFilters(QueryFailedFilter)
  @ApiOperation({
    summary: 'Create a new Order.',
  })
  @ApiCreatedResponse({
    type: Order,
    description: 'The record has been successfully created.',
  })
  create(
    @AuthUser() user: AuthUserExpress,
    @Body() createOrderDto: CreateOrderDto,
  ) {
    return this.orderService.create(user, createOrderDto);
  }

  @Patch(':id')
  @Roles(RolesEnum.ADMIN)
  @UseFilters(QueryFailedFilter)
  @ApiOperation({
    summary: 'Update existing Order by ID.',
  })
  @ApiCreatedResponse({
    type: Order,
    description: 'The record has been successfully updated.',
  })
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(+id, updateOrderDto);
  }

  @Get(':id')
  @Roles(RolesEnum.ADMIN, RolesEnum.USER)
  @UseFilters(QueryNotFoundFilter, QueryFailedFilter)
  @ApiSingleResponse({
    model: Order,
    apiOkDescription: 'Successfully received model list',
    summary: 'Find single item of existing Order.',
  })
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }
}
