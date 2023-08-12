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
    console.log('aku disini !!');
  }

  async canActivate(context: ExecutionContext) {
    const isActivate = (await super.canActivate(context)) as boolean;
    console.log('mang ea? ', isActivate);

    const req = context.switchToHttp().getRequest() as Request;

    console.log('sblm await ');
    await super.logIn(req);

    console.log('stelah await ', isActivate);

    return isActivate;
  }
}
