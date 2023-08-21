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
import { OrderStatusesService } from '../../services/order-statuses/order-statuses.service';
import { OrderStatus } from '@/db/models';
import { CreateOrderStatusesDto, UpdateOrderStatusesDto } from '../../dto';
import {
  ApiPaginatedResponse,
  Roles,
  ApiSingleResponse,
} from '@/common/decorators';
import { PaginationQuery, PaginatedDto } from '@/common/dto';
import { RolesEnum } from '@/common/enums';
import { QueryFailedFilter, QueryNotFoundFilter } from '@/common/filters';
import { IPaginationOptions } from 'nestjs-typeorm-paginate';

@ApiTags('Orders', 'Order Statuses')
@Controller('order-statuses')
export class OrderStatusesController {
  constructor(private readonly orderStatusesService: OrderStatusesService) {}

  @Get()
  @Roles(RolesEnum.ADMIN)
  @UseFilters(QueryFailedFilter)
  @ApiPaginatedResponse({
    model: OrderStatus,
    apiOkDescription: 'The records has been successfully returned.',
    summary: 'Find all of existing Order Statuses.',
  })
  findAll(
    @Query() paginationQuery: PaginationQuery,
  ): Promise<PaginatedDto<OrderStatus>> {
    const { page, limit, search, sortBy } = paginationQuery;
    const options: IPaginationOptions & PaginationQuery = {
      page,
      limit,
      search,
      sortBy,
    };

    return this.orderStatusesService.findAllPaginate(options);
  }

  @Post()
  @Roles(RolesEnum.ADMIN)
  @UseFilters(QueryFailedFilter)
  @ApiOperation({
    summary: 'Create a new Order Status.',
  })
  @ApiCreatedResponse({
    type: OrderStatus,
    description: 'The record has been successfully created.',
  })
  create(@Body() createOrderStatusesDto: CreateOrderStatusesDto) {
    return this.orderStatusesService.create(createOrderStatusesDto);
  }

  @Patch(':id')
  @Roles(RolesEnum.ADMIN)
  @UseFilters(QueryFailedFilter)
  @ApiOperation({
    summary: 'Update existing Order Statuses by ID.',
  })
  @ApiCreatedResponse({
    type: OrderStatus,
    description: 'The record has been successfully updated.',
  })
  update(
    @Param('id') id: string,
    @Body() updateOrderStatusesDto: UpdateOrderStatusesDto,
  ) {
    return this.orderStatusesService.update(+id, updateOrderStatusesDto);
  }

  @Get(':id')
  @UseFilters(QueryNotFoundFilter, QueryFailedFilter)
  @ApiSingleResponse({
    model: OrderStatus,
    apiOkDescription: 'Successfully received model list',
    summary: 'Find single item of existing Order Statuses.',
  })
  findOne(@Param('id') id: string) {
    return this.orderStatusesService.findOne(+id);
  }

  @Delete(':id')
  @Roles(RolesEnum.ADMIN)
  @UseFilters(QueryFailedFilter)
  @ApiSingleResponse({
    model: OrderStatus,
    apiOkDescription: 'The records has been successfully returned.',
    summary: 'Removed single item of existing Order Statuses.',
  })
  remove(@Param('id') id: string) {
    return this.orderStatusesService.remove(+id);
  }
}
