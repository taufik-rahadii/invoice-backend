import { Injectable, Logger } from '@nestjs/common';
import { In, Repository, SelectQueryBuilder } from 'typeorm';
import { SelectOption } from './types';
import { PaginationArgs } from '../pagination/pagination.args';
import { PaginationMetadataResponse } from '../pagination/pagination.response';
import { isNotEmpty } from 'class-validator';

@Injectable()
export abstract class ServiceBase<
  Entity,
  CreateDataDto extends any = any,
  ListDataDto extends PaginationArgs = PaginationArgs,
  UpdateDataDto extends any = any,
> {
  constructor(private readonly repository: Repository<Entity>) {}

  protected readonly _logger = new Logger(this.constructor.name);
  protected tableAlias: string;
  protected relations: string[] = [];
  protected selectOptions: SelectOption<ListDataDto, Entity> = [];

  protected customSaveValidation?: ((
    data: CreateDataDto,
  ) => boolean | Promise<boolean>)[] = [];
  protected customUpdateValidation?: ((data: UpdateDataDto) => boolean)[] = [];
  protected customDeleteValidation?: ((data: Entity) => boolean)[] = [];

  public baseQuery(): SelectQueryBuilder<Entity> {
    const query = this.repository.createQueryBuilder(this.tableAlias);

    return query;
  }

  public proceedPaginationQuery(
    queryParam: ListDataDto,
  ): SelectQueryBuilder<Entity> {
    const query = this.baseQuery()
      .limit(queryParam.limit)
      .offset(queryParam.offset);

    this.relations.forEach((relation) => {
      query.leftJoinAndSelect(`${this.tableAlias}.${relation}`, relation);
    });

    if (queryParam.search && isNotEmpty(queryParam.search)) {
      this.selectOptions.forEach((selectOption, i) => {
        const criteria =
          selectOption.operator === 'ILIKE' || selectOption.operator === 'LIKE'
            ? `%${queryParam[selectOption.key]}%`
            : queryParam[selectOption.key];

        query[selectOption.whereType](
          `${selectOption.tableAlias}.${selectOption.columnName as string} ${
            selectOption.operator
          } :value${i}`,
          {
            [`value${i}`]: criteria,
          },
        );
      });
    }

    return query;
  }

  public paginationMetadata(
    data: Entity[],
    total: number,
    queryParam: ListDataDto,
  ): { data: Entity[]; metadata: PaginationMetadataResponse } {
    return {
      data,
      metadata: {
        limit: queryParam.limit,
        offset: queryParam.offset,
        search: queryParam.search,
        total,
      },
    };
  }

  public async listItem(queryParam: ListDataDto) {
    try {
      const [data, count] =
        await this.proceedPaginationQuery(queryParam).getManyAndCount();

      return this.paginationMetadata(data, count, queryParam);
    } catch (error) {
      throw error;
    }
  }

  private async runValidation(
    key:
      | 'customSaveValidation'
      | 'customUpdateValidation'
      | 'customDeleteValidation',
    data: any,
  ) {
    if (this[key].length > 0) {
      await Promise.all(
        this[key].map(async (validation) => await validation(data)),
      );
    }
  }

  public async createItem(payload: CreateDataDto) {
    try {
      await this.runValidation('customSaveValidation', payload);

      const createData = await this.repository.save(
        this.repository.create(payload as any),
      );

      return createData as Entity;
    } catch (error) {
      throw error;
    }
  }

  public async getByIds(ids: string[]) {
    try {
      const data = await this.repository.find({
        where: {
          id: In(ids),
        } as any,
      });

      return data;
    } catch (error) {
      this._logger.error(error.message);
      throw error;
    }
  }

  public async getAndValidateById(id: string) {
    try {
      const data = await this.repository.findOneBy({
        id,
      } as any);

      return data;
    } catch (error) {
      this._logger.error(error.message);
      throw error;
    }
  }

  public async updateItem(id: string, payload: UpdateDataDto) {
    try {
      await this.runValidation('customUpdateValidation', payload);
      await this.repository.update(id, payload as any);

      return await this.getAndValidateById(id);
    } catch (error) {
      this._logger.error(error.message);
      throw error;
    }
  }

  public async deleteItem(id: string): Promise<boolean> {
    try {
      const data = await this.getAndValidateById(id);
      await this.runValidation('customDeleteValidation', data);
      await this.repository.softDelete(id);
      return true;
    } catch (error) {
      this._logger.error(error.message);
      throw error;
    }
  }
}
