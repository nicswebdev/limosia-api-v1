import { HttpStatus, Injectable } from '@nestjs/common';
import { CarClass } from '@/db/models';
import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';
import { PaginatedDto, PaginationQuery } from '@/common/dto';
import { CreateCarClassDto, UpdateCarClassDto } from '../../dto';
import { unlinkSync } from 'fs';

@Injectable()
export class CarClassService {
  constructor(
    @InjectRepository(CarClass)
    private readonly carClassRepository: Repository<CarClass>,
  ) {}

  async findAllPaginate(
    options: IPaginationOptions & PaginationQuery,
  ): Promise<PaginatedDto<CarClass>> {
    const val = await paginate<CarClass>(
      this.carClassRepository,
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

  create(createCarClassDto?: CreateCarClassDto) {
    const data = {
      ...createCarClassDto,
      image: createCarClassDto.image.path,
    };

    const newCarClass = this.carClassRepository.create(data);

    return this.carClassRepository.save(newCarClass);
  }

  findOne(id: number): Promise<CarClass> {
    return this.carClassRepository.findOneByOrFail({ id });
  }

  async update(id: number, updateAuthDto: UpdateCarClassDto) {
    try {
      const selfData = await this.findOne(id);
      if (selfData) {
        if (updateAuthDto.image) unlinkSync(`./${selfData.image}`);

        const data = {
          ...selfData,
          ...updateAuthDto,
          image: updateAuthDto.image?.path ?? undefined,
        };

        this.carClassRepository.save({ ...data, id });

        return {
          statusCode: HttpStatus.OK,
          message: 'Successfully updated!',
          data: await this.carClassRepository.findOneByOrFail({ id }),
        };
      }
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number) {
    try {
      const data = await this.findOne(id);
      if (data) unlinkSync(`./${data.image}`);
    } catch (error) {}

    return this.carClassRepository.delete(id);
  }
}
