import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './controllers/auth/auth.controller';
import { AuthService } from './services/auth/auth.service';
import { UsersModule } from '../users/users.module';
import { JwtStrategy, LocalStrategy } from './strategies';
import { JwtModule } from '@nestjs/jwt';
import { GoogleAuthController } from './controllers/google-auth/google-auth.controller';
import { GoogleAuthService } from './services/google-auth/google-auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '@/db/models';
import { GoogleStrategy } from './strategies/google.strategy';
import { SessionSerializer } from '@/common/utils';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
    PassportModule.register({ session: true }),
    UsersModule,
  ],
  controllers: [AuthController, GoogleAuthController],
  providers: [
    LocalStrategy,
    JwtStrategy,
    GoogleStrategy,
    SessionSerializer,

    AuthService,
    GoogleAuthService,
  ],
})
export class AuthModule {}
