import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

interface PaginationDataResponse<T> {
  statusCode: number;
  message: string;
  data: T;
}

@Injectable()
export class TransformMultipleDataInterceptor<T>
  implements NestInterceptor<T, PaginationDataResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<PaginationDataResponse<T>> {
    return next.handle().pipe(
      map((data) => ({
        statusCode: context.switchToHttp().getResponse().statusCode,
        reqId: context.switchToHttp().getRequest().reqId,
        message: data.message || '',
        data,
      })),
    );
  }
}
