import { PaginationQuery, PaginatedDto } from '@/common/dto';
import { PaymentStatus } from '@/db/models';
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';
import { Repository, Like } from 'typeorm';
import { CreatePaymentStatusesDto, UpdatePaymentStatusesDto } from '../../dto';

@Injectable()
export class PaymentStatusesService {
  constructor(
    @InjectRepository(PaymentStatus)
    private readonly paymentStatusesRepository: Repository<PaymentStatus>,
  ) {}

  async findAllPaginate(
    options: IPaginationOptions & PaginationQuery,
  ): Promise<PaginatedDto<PaymentStatus>> {
    const val = await paginate<PaymentStatus>(
      this.paymentStatusesRepository,
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

  create(createPaymentStatusesDto: CreatePaymentStatusesDto) {
    const newPaymentStatus = this.paymentStatusesRepository.create(
      createPaymentStatusesDto,
    );

    return this.paymentStatusesRepository.save(newPaymentStatus);
  }

  async update(id: number, updatePaymentStatusesDto: UpdatePaymentStatusesDto) {
    return this.paymentStatusesRepository.save({
      id,
      ...updatePaymentStatusesDto,
    });
  }

  findOne(id: number): Promise<PaymentStatus> {
    return this.paymentStatusesRepository.findOneOrFail({ where: { id } });
  }

  remove(id: number) {
    return this.paymentStatusesRepository.delete(id);
  }
}
