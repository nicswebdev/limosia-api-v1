import {
  Controller,
  Get,
  Query,
  Request,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UsersService } from '../../services/users/users.service';
import { QueryFailedFilter, QueryNotFoundFilter } from '@/common/filters';
import { JwtAuthGuard } from '@/module/auth/guards';
import { Users } from '@/db/models';
import {
  ApiPaginatedResponse,
  ApiSingleResponse,
  Roles,
} from '@/common/decorators';
import { PaginationQuery, PaginatedDto } from '@/common/dto';
import { IPaginationOptions } from 'nestjs-typeorm-paginate';
import { RolesEnum } from '@/common/enums';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Roles(RolesEnum.ADMIN)
  @UseFilters(QueryFailedFilter)
  @ApiPaginatedResponse({
    model: Users,
    apiOkDescription: 'The records has been successfully returned.',
    summary: 'Find all of existing Users.',
  })
  findAllUsers(
    @Query() paginationQuery: PaginationQuery,
  ): Promise<PaginatedDto<Users>> {
    const { page, limit, search, sortBy } = paginationQuery;
    const options: IPaginationOptions & PaginationQuery = {
      page,
      limit,
      search,
      sortBy,
    };

    return this.usersService.findAllPaginate(options);
  }

  @ApiTags('Authentication')
  @Get('me')
  @UseGuards(JwtAuthGuard)
  @UseFilters(QueryNotFoundFilter, QueryFailedFilter)
  @ApiSingleResponse({
    model: Users,
    apiOkDescription: 'Successfully received model list',
    summary: "Returned current logged in user's profile.",
  })
  @ApiBearerAuth('jwt-auth')
  findMyProfile(@Request() req) {
    return this.usersService.findOneByEmail(req.user.email);
  }
  
}
