import { applyDecorators, HttpStatus, Type } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { PaginatedDto } from '../../dto';

interface IPaginatedDecoratorApiResponse<T> {
  model: T;
  description?: string;
}

export const ApiPaginatedResponse = <TModel extends Type<any>>(
  options: IPaginatedDecoratorApiResponse<TModel>,
) => {
  return applyDecorators(
    ApiExtraModels(PaginatedDto),
    ApiOkResponse({
      description: options.description || 'Successfully received model list',
      schema: {
        allOf: [
          { $ref: getSchemaPath(PaginatedDto) },
          {
            properties: {
              statusCode: {
                type: 'number',
                default: HttpStatus.OK,
              },
              message: {
                type: 'string',
                default: 'Success',
              },
              items: {
                type: 'array',
                items: { $ref: getSchemaPath(options.model) },
              },
              meta: {
                type: 'any',
                default: {
                  totalItems: 2,
                  itemCount: 2,
                  itemsPerPage: 2,
                  totalPages: 1,
                  currentPage: 1,
                },
              },
            },
          },
        ],
      },
    }),
  );
};
