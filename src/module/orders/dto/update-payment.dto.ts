import { PartialType } from '@nestjs/swagger';
import { CreatePaymentStatusesDto } from './create-payment-statuses.dto';

export class UpdatePaymentStatusesDto extends PartialType(
  CreatePaymentStatusesDto,
) {}
