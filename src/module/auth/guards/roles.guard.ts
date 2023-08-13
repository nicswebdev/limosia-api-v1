import { RolesEnum } from '@/common/enums';
import { Role, UserRole } from '@/db/models';
import { UsersService } from '@/module/users/services/users/users.service';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<RolesEnum[]>(
      'roles',
      [context.getHandler(), context.getClass()],
    );
    const req = context.switchToHttp().getRequest();

    // means no role is required
    if (!requiredRoles) return true;

    if (req?.user) {
      const { email } = req.user;

      const user = await this.usersService.findOneByEmail(email);
      const userRole = user.user_role as UserRole;
      const { name: roleName } = userRole.role as unknown as Role;

      return requiredRoles.some((requiredRole) => roleName === requiredRole);
    }

    return false;
  }
}
