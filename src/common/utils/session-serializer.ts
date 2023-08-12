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
    console.log('serialize', user);
    done(null, user);
  }
  async deserializeUser(payload: any, done: Function) {
    console.log('peyload dari deserialize -> ', payload);

    const user = await this.usersService.findOneByEmail(payload.email);

    console.log(`desearlize ${Date.now()}`, payload);

    return user ? done(null, user) : done(null, null);
  }
}
