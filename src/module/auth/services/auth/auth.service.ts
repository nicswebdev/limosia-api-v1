import { UsersService } from '@/module/users/services/users/users.service';
import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Users } from '@/db/models';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,

    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<Partial<Users> | null> {
    const user = await this.usersService.findOneByEmail(email);

    const isHashedPasswordTrue = await bcrypt.compare(password, user.password);

    if (user && isHashedPasswordTrue) {
      const { password, ...result } = user;

      return result;
    }

    return null;
  }

  async generateToken(user: Users) {
    const payload = {
      email: user.email,
      sub: user.id,
    };

    const accessToken = this.jwtService.sign(payload);
    const { iat, exp }: any = this.jwtService.decode(accessToken);

    return {
      access_token: accessToken,
      expires_in: exp - iat,
    };
  }

  async login(user: Users) {
    const userData = await this.usersService.findOneByEmail(user.email);
    const token = await this.generateToken(user);

    return {
      token,
      user: userData,
    };
  }
}
