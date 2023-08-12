import { GoogleUserDetail } from '@/common/types';
import { Users } from '@/db/models';
import { UsersService } from '@/module/users/services/users/users.service';
import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class GoogleAuthService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,

    private readonly usersService: UsersService,
  ) {}

  async validateUser(user: GoogleUserDetail) {
    console.log('services ', { user });
    const queryUser = await this.usersRepository.findOneBy({
      email: user.email,
    });
    console.log('hmm ', { queryUser });

    if (queryUser) return queryUser;

    console.log('First time user! Creating new user...');
    return this.usersService.create(user);
  }
}
