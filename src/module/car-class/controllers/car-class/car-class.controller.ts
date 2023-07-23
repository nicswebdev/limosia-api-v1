import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseFilters,
} from '@nestjs/common';
import { CarClassService } from '../../services/car-class/car-class.service';
import {
  ApiConsumes,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CarClass } from '@/db/models';
import {
  ApiPaginatedResponse,
  ApiSingleResponse,
  ImageFileUploadInterceptor,
  UploadedFileValidator,
} from '@/common/decorators';
import { PaginatedDto, PaginationQuery } from '@/common/dto';
import { IPaginationOptions } from 'nestjs-typeorm-paginate';
import { CreateCarClassDto, UpdateCarClassDto } from '../../dto';
import { QueryNotFoundFilter } from '@/common/filters';

@ApiTags('car-class')
@Controller('car-class')
export class CarClassController {
  constructor(private readonly carClassService: CarClassService) {}

  @Get()
  @ApiPaginatedResponse({
    model: CarClass,
    apiOkDescription: 'The records has been successfully returned.',
    summary: 'Find all of existing Car Class.',
  })
  findAll(
    @Query() paginationQuery: PaginationQuery,
  ): Promise<PaginatedDto<CarClass>> {
    const { page, limit, search, sortBy } = paginationQuery;
    const options: IPaginationOptions & PaginationQuery = {
      page,
      limit,
      search,
      sortBy,
    };

    return this.carClassService.findAllPaginate({ ...options });
  }

  @Get(':id')
  @UseFilters(QueryNotFoundFilter)
  @ApiSingleResponse({
    model: CarClass,
    apiOkDescription: 'Successfully received model list',
    summary: 'Find single item of existing Car Class.',
  })
  findOne(@Param('id') id: string) {
    return this.carClassService.findOne(+id);
  }

  @Post()
  @ImageFileUploadInterceptor({ destination: './public/uploads/car_class' })
  @ApiOperation({
    summary: 'Create a new Car Class.',
  })
  @ApiConsumes('multipart/form-data')
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: CarClass,
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  async create(
    @Body() createCarClassDto: CreateCarClassDto,
    @UploadedFileValidator()
    image: Express.Multer.File,
  ) {
    const data = { ...createCarClassDto, image };

    return this.carClassService.create(data);
  }

  @Patch(':id')
  @ImageFileUploadInterceptor({ destination: './public/uploads/car_class' })
  @ApiSingleResponse({
    model: CarClass,
    apiOkDescription: 'The record has been successfully updated.',
    summary: 'Update existing Car Class by ID.',
  })
  @ApiConsumes('multipart/form-data', 'application/json')
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  update(
    @Param('id') id: string,
    @Body() updateAuthDto: UpdateCarClassDto,
    @UploadedFileValidator({ isRequired: false })
    image: Express.Multer.File,
  ) {
    const data = { ...updateAuthDto, image };

    return this.carClassService.update(+id, data);
  }

  @Delete(':id')
  @ApiSingleResponse({
    model: CarClass,
    apiOkDescription: 'The records has been successfully returned.',
    summary: 'Removed single item of existing Car Class.',
  })
  remove(@Param('id') id: string) {
    return this.carClassService.remove(+id);
  }
}
