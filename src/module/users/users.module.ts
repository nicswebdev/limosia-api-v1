import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users/users.controller';
import { UsersService } from './services/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Guests, Role, UserRole, Users } from '@/db/models';
import { RolesController } from './controllers/roles/roles.controller';
import { RolesService } from './services/roles/roles.service';

@Module({
  imports: [TypeOrmModule.forFeature([Users, Guests, Role, UserRole])],
  controllers: [UsersController, RolesController],
  providers: [UsersService, RolesService],
  exports: [UsersService],
})
export class UsersModule {}
