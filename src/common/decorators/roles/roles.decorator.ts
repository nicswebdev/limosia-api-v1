import { RolesEnum } from '@/common/enums';
import { JwtAuthGuard, RolesGuard } from '@/module/auth/guards';
import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

export const Roles = (...roleArgs: RolesEnum[]) => {
  return applyDecorators(
    SetMetadata('roles', roleArgs),
    UseGuards(JwtAuthGuard, RolesGuard),
    ApiBearerAuth('jwt-auth'),
  );
};
