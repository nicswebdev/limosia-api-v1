import { PaginationQuery, PaginatedDto } from '@/common/dto';
import { Order } from '@/db/models';
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';
import { Repository, Like, And } from 'typeorm';
import { CreateOrderDto, UpdateOrderDto } from '../../dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async findAllPaginate(
    options: IPaginationOptions & PaginationQuery,
  ): Promise<PaginatedDto<Order>> {
    const val = await paginate<Order>(
      this.orderRepository,
      { ...options },
      {
        where: {
          order_no: options.search && Like(`%${options.search}%`),
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

  create(createOrderDto: CreateOrderDto) {
    const newOrder = this.orderRepository.create(createOrderDto);

    return this.orderRepository.save(newOrder);
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    return this.orderRepository.save({ id, ...updateOrderDto });
  }

  async findOne(
    user: any,
    options: IPaginationOptions & PaginationQuery,
  ): Promise<PaginatedDto<Order>> {
    const val = await paginate<Order>(
      this.orderRepository,
      { ...options },
      {
        where: {
          order_no: options.search && Like(`%${options.search}%`),
          email: user.email,
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
}
