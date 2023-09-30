import { PaginationQuery, PaginatedDto } from '@/common/dto';
import { Order } from '@/db/models';
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';
import { Repository, Like } from 'typeorm';
import { CreateOrderDto, UpdateOrderDto } from '../../dto';
import { AuthUserExpress } from '@/common/types';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async findMyOrders(
    user: AuthUserExpress,
    options: IPaginationOptions & PaginationQuery,
  ): Promise<PaginatedDto<Order>> {
    console.log(user);

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
        relations: ['order_status', 'payment_status', 'car_class'],
      },
    );

    return {
      statusCode: HttpStatus.OK,
      message: 'Success',

      ...val,
    };
  }

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
        relations: ['order_status', 'payment_status'],
      },
    );

    return {
      statusCode: HttpStatus.OK,
      message: 'Success',

      ...val,
    };
  }

  async create(user: AuthUserExpress, createOrderDto: CreateOrderDto) {
    const { id, email } = user;

    const newOrder = await this.orderRepository.create({
      ...createOrderDto,
      user_id: id,
      email,
    });

    const savedOrder = await this.orderRepository.save(newOrder);

    return await this.orderRepository.findOneOrFail({
      where: { id: savedOrder.id },
      relations: ['order_status', 'payment_status'],
    });
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    return this.orderRepository.save({ id, ...updateOrderDto });
  }

  findOne(id: number): Promise<Order> {
    return this.orderRepository.findOneOrFail({
      where: { id },
      relations: ['order_status', 'payment_status'],
    });
  }
}
