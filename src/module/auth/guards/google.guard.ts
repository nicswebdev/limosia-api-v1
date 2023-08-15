import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Injectable()
export class GoogleAuthGuard extends AuthGuard('google') {
  // activating refresh_token
  constructor() {
    super({
      // accessType: 'offline',
    });
  }

  async canActivate(context: ExecutionContext) {
    const isActivate = (await super.canActivate(context)) as boolean;

    const req = context.switchToHttp().getRequest() as Request;

    await super.logIn(req);

    return isActivate;
  }
}
