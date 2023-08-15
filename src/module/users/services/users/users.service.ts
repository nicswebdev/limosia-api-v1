import { PaginationQuery, PaginatedDto } from '@/common/dto';
import { Guests, UserRole, Users } from '@/db/models';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';
import { DataSource, Like, Repository } from 'typeorm';
import { CreateUserDto } from '../../dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
    @InjectRepository(Guests)
    private readonly guestRepository: Repository<Guests>,
    @InjectRepository(UserRole)
    private readonly userRoleRepository: Repository<UserRole>,

    private readonly dataSource: DataSource,
  ) {}

  async findAllPaginate(
    options: IPaginationOptions & PaginationQuery,
  ): Promise<PaginatedDto<Users>> {
    const val = await paginate<Users>(
      this.usersRepository,
      { ...options },
      {
        where: {
          f_name: options.search && Like(`%${options.search}%`),
          l_name: options.search && Like(`%${options.search}%`),
        },
        order: {
          id: options.sortBy,
        },
        relations: ['user_role.role', 'guest'],
      },
    );

    return {
      statusCode: HttpStatus.OK,
      message: 'Success',

      ...val,
    };
  }

  async create(createUsersDto: CreateUserDto) {
    const { email } = createUsersDto;
    const existingUser = await this.usersRepository.findOneBy({
      email,
    });

    if (existingUser) {
      throw new HttpException(
        'Email is already taken.',
        HttpStatus.BAD_REQUEST,
      );
    }

    return new Promise(async (resolve, reject) => {
      try {
        await this.dataSource.transaction(async (manager) => {
          const { guest, ...userRest } = createUsersDto;

          const newUser = this.usersRepository.create(userRest);
          const savedUser = await manager.save(newUser);

          const newGuest = this.guestRepository.create({
            ...guest,

            user: savedUser.id,
          });
          await manager.save(newGuest);

          const newUserRole = this.userRoleRepository.create({
            user: savedUser.id,
            role: 2,
          });
          await manager.save(newUserRole);

          const user = await manager.findOne(Users, {
            where: {
              email: savedUser.email,
            },
            relations: ['user_role.role', 'guest'],
          });

          resolve({
            statusCode: HttpStatus.CREATED,
            message: 'User successfully created!',

            user,
          });
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  async findOneByEmail(email: string): Promise<Users> {
    return this.usersRepository.findOneOrFail({
      where: {
        email,
      },
      relations: ['user_role.role', 'guest'],
    });
  }
}
