import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { GoogleAuthGuard } from '../../guards';
import { AuthService } from '../../services/auth/auth.service';

@ApiTags('Authentication')
@Controller('auth/google')
export class GoogleAuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('login')
  @UseGuards(GoogleAuthGuard)
  @ApiOperation({
    summary: 'Google Log in auth',
  })
  login() {
    return;
  }

  @Get('callback')
  @UseGuards(GoogleAuthGuard)
  handleCallback(@Request() req) {
    return this.authService.generateToken(req.user);
  }
}
