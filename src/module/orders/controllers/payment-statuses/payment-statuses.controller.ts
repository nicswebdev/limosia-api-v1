import { PaymentStatus } from '@/db/models';
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
import { CreatePaymentStatusesDto, UpdatePaymentStatusesDto } from '../../dto';
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
import { PaymentStatusesService } from '../../services/payment-statuses/payment-statuses.service';

@ApiTags('Orders', 'Payment Statuses')
@Controller('payment-statuses')
export class PaymentStatusesController {
  constructor(
    private readonly paymentStatusesService: PaymentStatusesService,
  ) {}

  @Get()
  @Roles(RolesEnum.ADMIN)
  @UseFilters(QueryFailedFilter)
  @ApiPaginatedResponse({
    model: PaymentStatus,
    apiOkDescription: 'The records has been successfully returned.',
    summary: 'Find all of existing Payment Statuses.',
  })
  findAll(
    @Query() paginationQuery: PaginationQuery,
  ): Promise<PaginatedDto<PaymentStatus>> {
    const { page, limit, search, sortBy } = paginationQuery;
    const options: IPaginationOptions & PaginationQuery = {
      page,
      limit,
      search,
      sortBy,
    };

    return this.paymentStatusesService.findAllPaginate(options);
  }

  @Post()
  @Roles(RolesEnum.ADMIN)
  @UseFilters(QueryFailedFilter)
  @ApiOperation({
    summary: 'Create a new Payment Status.',
  })
  @ApiCreatedResponse({
    type: PaymentStatus,
    description: 'The record has been successfully created.',
  })
  create(@Body() createPaymentStatusesDto: CreatePaymentStatusesDto) {
    return this.paymentStatusesService.create(createPaymentStatusesDto);
  }

  @Patch(':id')
  @Roles(RolesEnum.ADMIN)
  @UseFilters(QueryFailedFilter)
  @ApiOperation({
    summary: 'Update existing Payment Statuses by ID.',
  })
  @ApiCreatedResponse({
    type: PaymentStatus,
    description: 'The record has been successfully updated.',
  })
  update(
    @Param('id') id: string,
    @Body() updatePaymentStatusesDto: UpdatePaymentStatusesDto,
  ) {
    return this.paymentStatusesService.update(+id, updatePaymentStatusesDto);
  }

  @Get(':id')
  @UseFilters(QueryNotFoundFilter, QueryFailedFilter)
  @ApiSingleResponse({
    model: PaymentStatus,
    apiOkDescription: 'Successfully received model list',
    summary: 'Find single item of existing Payment Statuses.',
  })
  findOne(@Param('id') id: string) {
    return this.paymentStatusesService.findOne(+id);
  }

  @Delete(':id')
  @Roles(RolesEnum.ADMIN)
  @UseFilters(QueryFailedFilter)
  @ApiSingleResponse({
    model: PaymentStatus,
    apiOkDescription: 'The records has been successfully returned.',
    summary: 'Removed single item of existing Payment Statuses.',
  })
  remove(@Param('id') id: string) {
    return this.paymentStatusesService.remove(+id);
  }
}
