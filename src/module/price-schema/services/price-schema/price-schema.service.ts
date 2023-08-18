import { PriceSchema } from '@/db/models';
import { HttpStatus, Injectable } from '@nestjs/common';
import { CreatePriceSchemaDto, UpdatePriceSchemaDto } from '../../dto';
import { PaginationQuery, PaginatedDto } from '@/common/dto';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';
import { Repository, Like } from 'typeorm';

@Injectable()
export class PriceSchemaService {
  constructor(
    @InjectRepository(PriceSchema)
    private readonly priceSchemaRepository: Repository<PriceSchema>,
  ) {}

  async findAllPaginate(
    options: IPaginationOptions & PaginationQuery,
  ): Promise<PaginatedDto<PriceSchema>> {
    const val = await paginate<PriceSchema>(
      this.priceSchemaRepository,
      { ...options },
      {
        where: {
          tier_name: options.search && Like(`%${options.search}%`),
        },
        order: {
          id: options.sortBy,
        },
        relations: ['airport', 'car_class'],
      },
    );

    return {
      statusCode: HttpStatus.OK,
      message: 'Success',

      ...val,
    };
  }

  create(createPriceSchemaDto: CreatePriceSchemaDto) {
    const newPriceSchema = this.priceSchemaRepository.create({
      ...createPriceSchemaDto,

      airport_id: createPriceSchemaDto.airport_id,
      car_class_id: createPriceSchemaDto.car_class_id,
    });

    return this.priceSchemaRepository.save(newPriceSchema);
  }

  async update(id: number, updatePriceSchemaDto: UpdatePriceSchemaDto) {
    const { airport_id, car_class_id, ...rest } = updatePriceSchemaDto;
    await this.priceSchemaRepository.update(id, {
      ...rest,

      airport_id: airport_id,
      car_class_id: car_class_id,
    });

    return await this.findOne(id);
  }

  findOne(id: number): Promise<PriceSchema> {
    return this.priceSchemaRepository.findOneOrFail({
      where: {
        id,
      },
      relations: ['airport', 'car_class'],
    });
  }

  remove(id: number) {
    return this.priceSchemaRepository.delete(id);
  }
}
