import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { EntityNotFoundError } from 'typeorm';
import { Request, Response } from 'express';

@Catch(EntityNotFoundError)
export class QueryNotFoundFilter implements ExceptionFilter {
  catch(exception: EntityNotFoundError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const messageDetail = exception.message
      .split('"')
      .join(' ')
      .split('\n')[2]
      .replace(/ +(?= )/g, '')
      .trim();

    response.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
      ...exception,

      statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: `Data "${messageDetail}", was not found.`,
      exceptionMessage: exception.message,
    });
  }
}
