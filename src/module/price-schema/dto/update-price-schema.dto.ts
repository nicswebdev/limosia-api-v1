import { PartialType } from '@nestjs/swagger';
import { CreatePriceSchemaDto } from './create-price-schema.dto';

export class UpdatePriceSchemaDto extends PartialType(CreatePriceSchemaDto) {}
