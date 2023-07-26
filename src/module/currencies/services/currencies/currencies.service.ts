import { PaginationQuery, PaginatedDto } from '@/common/dto';
import { Currency } from '@/db/models';
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';
import { Repository, Like } from 'typeorm';
import { CreateCurrencyDto, UpdateCurrencyDto } from '../../dto';

@Injectable()
export class CurrenciesService {
  constructor(
    @InjectRepository(Currency)
    private readonly currencyRepository: Repository<Currency>,
  ) {}

  async findAllPaginate(
    options: IPaginationOptions & PaginationQuery,
  ): Promise<PaginatedDto<Currency>> {
    const val = await paginate<Currency>(
      this.currencyRepository,
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

  create(createCurrencyDto: CreateCurrencyDto) {
    const newCurrency = this.currencyRepository.create(createCurrencyDto);

    return this.currencyRepository.save(newCurrency);
  }

  async update(id: number, updateCurrencyDto: UpdateCurrencyDto) {
    return this.currencyRepository.save({ id, ...updateCurrencyDto });
  }

  findOne(id: number): Promise<Currency> {
    return this.currencyRepository.findOneByOrFail({ id });
  }

  remove(id: number) {
    return this.currencyRepository.delete(id);
  }
}
