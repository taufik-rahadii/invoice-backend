import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dtos/create-user.dto';
import { ServiceBase } from '../../../common/base/service.base';
import { PaginationArgs } from '../../../common/pagination/pagination.args';
import { SelectOption } from '../../../common/base/types';

@Injectable()
export class UserService extends ServiceBase<User> {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {
    super(userRepo);
  }

  protected tableAlias: string = 'user';
  protected relations: string[] = [];
  protected selectOptions: SelectOption<PaginationArgs, User> = [
    {
      columnName: 'firstname',
      key: 'search',
      operator: 'ILIKE',
      tableAlias: 'user',
      whereType: 'orWhere',
    },
  ];

  // list user
  public async listUser(args: PaginationArgs) {
    return await this.listItem(args);
  }

  // create user
  public async createUser(payload: CreateUserDto) {
    return await this.userRepo.save(this.userRepo.create(payload));
  }

  public async getDetailAndValidateUserById(id: string) {
    try {
      const user = await this.userRepo.findOne({
        where: {
          id,
        },
        relations: ['role', 'role.permissions'],
      });

      if (!user)
        throw new UnprocessableEntityException({
          status: false,
          code: 'USER-404',
          message: 'User not found',
          errors: null,
        });

      return user;
    } catch (error) {
      throw error;
    }
  }

  // validate user id and return user data
  public async getAndValidateUserById(id: string) {
    try {
      const user = await this.userRepo.findOne({
        where: {
          id,
        },
      });

      if (!user)
        throw new UnprocessableEntityException({
          status: false,
          code: 'USER-404',
          message: 'User not found',
          errors: null,
        });

      return user;
    } catch (error) {
      throw error;
    }
  }

  // get one user by field
  public async getDetailUser(fieldName: keyof User, value: any) {
    try {
      const user = await this.userRepo.findOne({
        where: {
          [fieldName]: value,
        },
      });

      return user;
    } catch (error) {
      throw error;
    }
  }

  // update user by id
  public async updateUserById(id: string, payload: Partial<User>) {
    try {
      const user = await this.getDetailUser('id', payload);

      const updated = await this.userRepo.save({ ...user, ...payload });

      return updated;
    } catch (error) {
      throw error;
    }
  }

  // delete user by id
}
