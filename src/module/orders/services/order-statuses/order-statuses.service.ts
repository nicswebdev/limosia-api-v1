import { PaginationQuery, PaginatedDto } from '@/common/dto';
import { OrderStatus } from '@/db/models';
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';
import { Repository, Like } from 'typeorm';
import { CreateOrderStatusesDto, UpdateOrderStatusesDto } from '../../dto';

@Injectable()
export class OrderStatusesService {
  constructor(
    @InjectRepository(OrderStatus)
    private readonly orderStatusesRepository: Repository<OrderStatus>,
  ) {}

  async findAllPaginate(
    options: IPaginationOptions & PaginationQuery,
  ): Promise<PaginatedDto<OrderStatus>> {
    const val = await paginate<OrderStatus>(
      this.orderStatusesRepository,
      { ...options },
      {
        where: {
          name: options.search && Like(`%${options.search}%`),
        },
        order: {
          id: options.sortBy,
        },
      },
    );

    return {
      statusCode: HttpStatus.OK,
      message: 'Success',

      ...val,
    };
  }

  create(createOrderStatusesDto: CreateOrderStatusesDto) {
    const newOrderStatus = this.orderStatusesRepository.create(
      createOrderStatusesDto,
    );

    return this.orderStatusesRepository.save(newOrderStatus);
  }

  async update(id: number, updateOrderStatusesDto: UpdateOrderStatusesDto) {
    return this.orderStatusesRepository.save({ id, ...updateOrderStatusesDto });
  }

  findOne(id: number): Promise<OrderStatus> {
    return this.orderStatusesRepository.findOneOrFail({ where: { id } });
  }

  remove(id: number) {
    return this.orderStatusesRepository.delete(id);
  }
}
