import { PriceSchema } from '@/db/models';
import { HttpStatus, Injectable } from '@nestjs/common';
import { CreatePriceSchemaDto, UpdatePriceSchemaDto } from '../../dto';
import { PaginationQuery, PaginatedDto } from '@/common/dto';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';
import {
  Repository,
  Like,
  LessThan,
  MoreThan,
  MoreThanOrEqual,
  Brackets,
} from 'typeorm';

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
          car_class_id: options.sortBy,
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

  async findAllByAirportIdAndRange(
    airport_id: number,
    range: number,
    prebook: number,
  ) {
    let val: any;
    // console.log(prebook);

    val = await this.priceSchemaRepository.query(
      `
      WITH RankedPrices AS (
        SELECT 
            *,
            ROW_NUMBER() OVER (PARTITION BY car_class_id ORDER BY 
                CASE 
                    WHEN ? BETWEEN from_range_km AND to_range_km THEN 1
                    ELSE 2
                END, 
                to_range_km DESC) AS rn
        FROM price_schema
        WHERE airport_id = ? 
        AND (refundable_base_price_1 > 0  OR refundable_base_price_2 > 0 OR non_refundable_base_price_1>0 OR non_refundable_base_price_2>0) 
        AND (? >= prebook_time_hour_1 OR (prebook_time_hour_2 IS NOT NULL AND  ? >= prebook_time_hour_2)) 
    )
    SELECT *,
    CASE
      WHEN ? >= prebook_time_hour_1 AND (prebook_time_hour_2 IS NULL OR ? < prebook_time_hour_2) AND refundable_base_price_1>0  THEN refundable_base_price_1
      WHEN ? < prebook_time_hour_1 AND (prebook_time_hour_2 IS NOT NULL AND ? >= prebook_time_hour_2) AND refundable_base_price_2>0   THEN refundable_base_price_2
      WHEN ? >= prebook_time_hour_1 AND (prebook_time_hour_2 IS NOT NULL AND ? >= prebook_time_hour_2)  AND prebook_time_hour_1 > prebook_time_hour_2 AND refundable_base_price_1>0 THEN refundable_base_price_1
        ELSE refundable_base_price_2
    END AS relevant_refundable_price,
    CASE
      WHEN ? >= prebook_time_hour_1 AND (prebook_time_hour_2 IS NULL OR ? < prebook_time_hour_2)  THEN non_refundable_base_price_1
      WHEN ? < prebook_time_hour_1 AND (prebook_time_hour_2 IS NOT NULL AND ? >= prebook_time_hour_2)  THEN non_refundable_base_price_2
      WHEN ? >= prebook_time_hour_1 AND (prebook_time_hour_2 IS NOT NULL AND ? >= prebook_time_hour_2)  AND prebook_time_hour_1 > prebook_time_hour_2 THEN non_refundable_base_price_1
        ELSE non_refundable_base_price_2
    END AS relevant_non_refundable_price
    FROM RankedPrices
    INNER JOIN car_class ON car_class_id = car_class.id
    WHERE rn = 1
    ORDER BY car_class_id;    
      `,
      [
        range,
        airport_id,
        prebook,
        prebook,
        prebook,
        prebook,
        prebook,
        prebook,
        prebook,
        prebook,
        prebook,
        prebook,
        prebook,
        prebook,
        prebook,
        prebook,
      ],
    );

    const items: PriceSchema[] = val;
    return {
      statusCode: HttpStatus.OK,
      message: 'Success',
      items,
    };
  }

  create(createPriceSchemaDto: CreatePriceSchemaDto) {
    const newPriceSchema = this.priceSchemaRepository.create({
      ...createPriceSchemaDto,

      airport_id: createPriceSchemaDto.airport_id,
      car_class_id: createPriceSchemaDto.car_class_id,
    });
    // console.log(newPriceSchema)

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

  async findOneByAirportCarClassRange(
    airport_id: number,
    car_class_id: number,
    range: number,
    prebook: number,
  ) {
    let val: any;
    console.log(prebook);
    val = await this.priceSchemaRepository.query(
      `
      WITH RankedPrices AS (
        SELECT 
            *,
            ROW_NUMBER() OVER (PARTITION BY car_class_id ORDER BY 
                CASE 
                    WHEN ? BETWEEN from_range_km AND to_range_km THEN 1
                    ELSE 2
                END, 
                to_range_km DESC) AS rn
        FROM price_schema
        WHERE airport_id = ? 
        AND car_class_id = ?
        AND (refundable_base_price_1 > 0  OR refundable_base_price_2 > 0 OR non_refundable_base_price_1>0 OR non_refundable_base_price_2>0) 
        AND (? >= prebook_time_hour_1 OR (prebook_time_hour_2 IS NOT NULL AND  ? >= prebook_time_hour_2)) 
    )
    SELECT *,
    CASE
    WHEN ? >= prebook_time_hour_1 AND (prebook_time_hour_2 IS NULL OR ? < prebook_time_hour_2) AND refundable_base_price_1>0  THEN refundable_base_price_1
    WHEN ? < prebook_time_hour_1 AND (prebook_time_hour_2 IS NOT NULL AND ? >= prebook_time_hour_2) AND refundable_base_price_2>0   THEN refundable_base_price_2
    WHEN ? >= prebook_time_hour_1 AND (prebook_time_hour_2 IS NOT NULL AND ? >= prebook_time_hour_2)  AND prebook_time_hour_1 > prebook_time_hour_2 AND refundable_base_price_1>0 THEN refundable_base_price_1
      ELSE refundable_base_price_2
  END AS relevant_refundable_price,
  CASE
    WHEN ? >= prebook_time_hour_1 AND (prebook_time_hour_2 IS NULL OR ? < prebook_time_hour_2)  THEN non_refundable_base_price_1
    WHEN ? < prebook_time_hour_1 AND (prebook_time_hour_2 IS NOT NULL AND ? >= prebook_time_hour_2)  THEN non_refundable_base_price_2
    WHEN ? >= prebook_time_hour_1 AND (prebook_time_hour_2 IS NOT NULL AND ? >= prebook_time_hour_2)  AND prebook_time_hour_1 > prebook_time_hour_2 THEN non_refundable_base_price_1
      ELSE non_refundable_base_price_2
  END AS relevant_non_refundable_price
    FROM RankedPrices
    INNER JOIN car_class ON car_class_id = car_class.id
    WHERE rn = 1
    LIMIT 1

      `,
      [
        range,
        airport_id,
        car_class_id,
        prebook,
        prebook,
        prebook,
        prebook,
        prebook,
        prebook,
        prebook,
        prebook,
        prebook,
        prebook,
        prebook,
        prebook,
        prebook,
        prebook,
      ],
    );
    return val[0];
  }

  remove(id: number) {
    return this.priceSchemaRepository.delete(id);
  }
}
