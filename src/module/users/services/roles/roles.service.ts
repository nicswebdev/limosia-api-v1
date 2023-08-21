import { Role } from '@/db/models';
import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateRoleDto } from '../../dto/create-role.dto';
import { PaginationQuery, PaginatedDto } from '@/common/dto';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';
import { Repository, Like } from 'typeorm';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async findAllPaginate(
    options: IPaginationOptions & PaginationQuery,
  ): Promise<PaginatedDto<Role>> {
    const val = await paginate<Role>(
      this.roleRepository,
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

  create(createRoleDto: CreateRoleDto) {
    const newOrderStatus = this.roleRepository.create(createRoleDto);

    return this.roleRepository.save(newOrderStatus);
  }

  findOne(id: number): Promise<Role> {
    return this.roleRepository.findOneOrFail({ where: { id } });
  }
}
