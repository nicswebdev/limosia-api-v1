/* eslint-disable @typescript-eslint/ban-types */
import { UsersService } from '@/module/users/services/users/users.service';
import { Inject, Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { Auth } from 'typeorm';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(
    @Inject(UsersService)
    private readonly usersService: UsersService,
  ) {
    super();
  }

  serializeUser(user: Auth, done: Function) {
    done(null, user);
  }
  async deserializeUser(payload: any, done: Function) {
    const user = await this.usersService.findOneByEmail(payload.email);

    return user ? done(null, user) : done(null, null);
  }
}
