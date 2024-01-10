import { ArgsType } from '@nestjs/graphql';
import { CreateCounterDto } from './create-counter.dto';

@ArgsType()
export class UpdateCounterDto extends CreateCounterDto {}
