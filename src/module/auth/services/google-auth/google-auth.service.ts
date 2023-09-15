import { GoogleUserDetail } from '@/common/types';
import { Users } from '@/db/models';
import { UsersService } from '@/module/users/services/users/users.service';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class GoogleAuthService {
  private readonly logger = new Logger(GoogleAuthService.name);

  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,

    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  async validateUser(user: GoogleUserDetail) {
    const queryUser = await this.usersRepository.findOneBy({
      email: user.email,
    });

    if (queryUser) {
      return this.authService.generateToken(queryUser);
    }

    this.logger.warn('First time user! Creating new user...');
    await this.usersService.create(user);
    const newUser = await this.usersRepository.findOneBy({
      email: user.email,
    });

    return await this.authService.generateToken(newUser);
  }
}
