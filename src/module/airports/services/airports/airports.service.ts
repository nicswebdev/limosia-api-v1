import { PaginationQuery, PaginatedDto } from '@/common/dto';
import { Airports } from '@/db/models';
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';
import { Repository, Like } from 'typeorm';

@Injectable()
export class AirportsService {
  constructor(
    @InjectRepository(Airports)
    private readonly airportRepository: Repository<Airports>,
  ) {}

  async findAllPaginate(
    options: IPaginationOptions & PaginationQuery,
  ): Promise<PaginatedDto<Airports>> {
    const val = await paginate<Airports>(
      this.airportRepository,
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

  findOne(id: number): Promise<Airports> {
    return this.airportRepository.findOneByOrFail({ id });
  }

  remove(id: number) {
    return this.airportRepository.delete(id);
  }
}
