import { applyDecorators, Type } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';

interface ISingleDecoratorApiResponse<T> {
  model: T;
  apiOkDescription?: string;
  summary?: string;
}

export const ApiSingleResponse = <TModel extends Type<any>>(
  options: ISingleDecoratorApiResponse<TModel>,
) => {
  return applyDecorators(
    ApiOperation({
      summary: options.summary || '',
    }),
    ApiOkResponse({
      type: options.model,
      description:
        options.apiOkDescription || 'Successfully received model list.',
    }),
  );
};
