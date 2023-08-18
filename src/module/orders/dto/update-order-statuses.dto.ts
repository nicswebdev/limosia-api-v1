import { PartialType } from '@nestjs/swagger';
import { CreateOrderStatusesDto } from './create-order-statuses.dto';

export class UpdateOrderStatusesDto extends PartialType(
  CreateOrderStatusesDto,
) {}
