import { GoogleUserDetail } from '@/common/types';
import { Users } from '@/db/models';
import { UsersService } from '@/module/users/services/users/users.service';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class GoogleAuthService {
  private readonly logger = new Logger(GoogleAuthService.name);

  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,

    private readonly usersService: UsersService,
  ) {}

  async validateUser(user: GoogleUserDetail) {
    const queryUser = await this.usersRepository.findOneBy({
      email: user.email,
    });

    if (queryUser) return queryUser;

    this.logger.warn('First time user! Creating new user...');
    return this.usersService.create(user);
  }
}
