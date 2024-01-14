import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Counter } from '../entities/counter.entity';
import { Repository } from 'typeorm';
import { ServiceBase } from '../../../common/base/service.base';
import { CreateCounterDto } from '../dtos/create-counter.dto';
import { PaginationArgs } from '../../../common/pagination/pagination.args';
import { SelectOption } from '../../../common/base/types';
import { UpdateCounterDto } from '../dtos/update-counter.dto';

@Injectable()
export class CounterService extends ServiceBase<
  Counter,
  CreateCounterDto,
  PaginationArgs,
  UpdateCounterDto
> {
  constructor(
    @InjectRepository(Counter)
    private readonly counterRepo: Repository<Counter>,
  ) {
    super(counterRepo);
  }

  protected tableAlias: string = 'counter';
  protected relations: string[] = [];
  protected selectOptions: SelectOption<PaginationArgs, Counter> = [
    {
      columnName: 'name',
      key: 'search',
      operator: 'ILIKE',
      tableAlias: this.tableAlias,
      whereType: 'orWhere',
    },
  ];
}
