import {
  Body,
  Controller,
  Post,
  Request,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { LocalAuthGuard } from '../../guards';
import { LoginDto } from '../../dto';
import { AuthService } from '../../services/auth/auth.service';
import { QueryFailedFilter, QueryNotFoundFilter } from '@/common/filters';
import { Users } from '@/db/models';
import { CreateUserDto } from '@/module/users/dto';
import { UsersService } from '@/module/users/services/users/users.service';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @UseFilters(QueryNotFoundFilter, QueryFailedFilter)
  @ApiOperation({
    summary: 'Log in auth',
  })
  @ApiOkResponse({
    schema: {
      properties: {
        access_token: {
          type: 'string',
        },
      },
    },
    description: 'The record has been successfully created.',
  })
  @ApiBody({ type: LoginDto })
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('register')
  @UseFilters(QueryFailedFilter)
  @ApiOperation({
    summary: 'Register a new User.',
  })
  @ApiCreatedResponse({
    type: Users,
    description: 'The record has been successfully created.',
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  async create(@Body() createUsersDto: CreateUserDto) {
    return await this.usersService.create(createUsersDto);
  }

  @Post('check-email')
  @UseFilters(QueryFailedFilter)
  @ApiOperation({
    summary: 'Check if email exists in database',
  })
  @ApiOkResponse({
    description: 'The record has been successfully created.',
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  async checkEmail(@Request() req) {
    return await this.usersService.findOneByEmail(req.body.email);
  }
}
