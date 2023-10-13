import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { GoogleAuthGuard } from '../../guards';
import { AuthService } from '../../services/auth/auth.service';
import { GoogleStrategy } from '../../strategies/google.strategy';

@ApiTags('Authentication')
@Controller('auth/google')
export class GoogleAuthController {
  constructor(private readonly googleStrategy: GoogleStrategy) {}

  @Post('google-login')
  async googleLogin(@Body() body) {
    const { idToken } = body; 
    try {
      const user = await this.googleStrategy.validate(idToken);
      return user;
    } catch (error) {
      throw new UnauthorizedException('Invalid Google access token');
    }
  }
}
