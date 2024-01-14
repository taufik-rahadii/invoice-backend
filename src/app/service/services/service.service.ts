import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Service } from '../entities/service.entity';
import { ServiceBase } from '../../../common/base/service.base';
import { SelectOption } from '../../../common/base/types';
import { PaginationArgs } from '../../../common/pagination/pagination.args';
import { CreateServiceDto } from '../dtos/create-service.dto';
import { UpdateServiceDto } from '../dtos/update-service.dto';

@Injectable()
export class ServiceService extends ServiceBase<
  Service,
  CreateServiceDto,
  PaginationArgs,
  UpdateServiceDto
> {
  constructor(
    @InjectRepository(Service)
    private readonly serviceRepo: Repository<Service>,
  ) {
    super(serviceRepo);
  }

  protected tableAlias: string = 'service';
  protected relations: string[] = [];
  protected selectOptions: SelectOption<PaginationArgs, Service> = [
    {
      columnName: 'name',
      key: 'search',
      operator: 'ILIKE',
      tableAlias: this.tableAlias,
      whereType: 'orWhere',
    },
  ];
}
