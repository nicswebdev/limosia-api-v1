import { PaginationQuery, PaginatedDto } from '@/common/dto';
import { Airports } from '@/db/models';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';
import { Repository, Like } from 'typeorm';
import { CreateAirportDto, UpdateAirportDto } from '../../dto';

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

  async create(createAirportDto: CreateAirportDto) {
    const { name, place_id, name_from_maps } = createAirportDto;
    const duplicateName = await this.airportRepository.findOneBy({
      name,
    });
    const duplicatePlaceId = await this.airportRepository.findOneBy({
      place_id,
    });

    if (duplicateName) {
      throw new HttpException(
        'Airport name already exist, please use another name',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (duplicatePlaceId) {
      throw new HttpException(
        `${name_from_maps} already exists, please select another airport from maps`,
        HttpStatus.BAD_REQUEST,
      );
    }
    if (place_id.trim().length === 0) {
      throw new HttpException(
        `Please only select Name From Maps from our google map reccomendation`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const newAirport = this.airportRepository.create(createAirportDto);

    return this.airportRepository.save(newAirport);
  }

  async update(id: number, updateAirportDto: UpdateAirportDto) {
    const { name, place_id, name_from_maps } = updateAirportDto;

    const previous = await this.airportRepository.findOneBy({
      id,
    });

    const duplicateName = await this.airportRepository.findOneBy({
      name,
    });
    const duplicatePlaceId = await this.airportRepository.findOneBy({
      place_id,
    });

    if (duplicateName && !(name === previous.name)) {
      throw new HttpException(
        'Airport name already exist, please use another name',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (duplicatePlaceId && !(name_from_maps === previous.name_from_maps)) {
      throw new HttpException(
        `${name_from_maps} already exists, please select another airport from maps`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.airportRepository.save({ id, ...updateAirportDto });
  }

  findOne(id: number): Promise<Airports> {
    return this.airportRepository.findOneOrFail({ where: { id } });
  }

  findOneByPlaceId(place_id: string): Promise<Airports> {
    return this.airportRepository.findOneOrFail({ where: { place_id } });
  }

  remove(id: number) {
    return this.airportRepository.delete(id);
  }
}
