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
    const { idToken } = body; // Assuming you pass the Google access token in the request body
    // Validate the Google access token using the GoogleStrategy
    try {
      const user = await this.googleStrategy.validate(idToken);
      // The token is valid, and user contains the user's information.
      // Your logic to handle the user data goes here.
      return user;
    } catch (error) {
      // Token verification failed, throw an UnauthorizedException.
      throw new UnauthorizedException('Invalid Google access token');
    }
  }
}
