import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { User } from '../entities/user.entity';
import { UserService } from '../services/user.service';
import { Role } from '../../../app/auth/role/entities/role.entity';
// import { RoleLoader } from '../../../app/auth/role/services/role.loader';
import { CreateUserDto } from '../dtos/create-user.dto';
import { PaginationArgs } from '../../../common/pagination/pagination.args';
import { ListUserRes } from '../dtos/list-user.dto';
import { UseGuards } from '@nestjs/common';
import { JwtGuard } from '../../../common/guards/jwt.guard';
import { UserInfo } from '../../../common/decorators/userinfo.decorator';

@Resolver((of) => User)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    // private readonly roleLoader: RoleLoader,
  ) {}

  // list user
  @Query(() => ListUserRes, { nullable: true })
  @UseGuards(JwtGuard)
  listUser(
    @Args('pagination', { type: () => PaginationArgs, name: 'pagination' })
    pagination: PaginationArgs,
  ) {
    return this.userService.listUser(pagination);
  }
  // create user
  @Mutation(() => User)
  createUser(@Args() user: CreateUserDto) {
    return this.userService.createUser(user);
  }

  // get one user by id
  @Query(() => User)
  detailUser(@Args('id', { type: () => String }) id: string) {
    return this.userService.getAndValidateById(id);
  }
  // update user
  @Mutation(() => User)
  updateUser(
    @Args('id', { type: () => String }) id: string,
    @Args() payload: CreateUserDto,
  ) {
    return this.userService.updateItem(id, payload);
  }

  // delete user
  @Mutation(() => Boolean)
  deleteUser(@Args('id', { type: () => String }) id: string) {
    return this.userService.deleteItem(id);
  }

  // user profile
  @Query(() => User)
  @UseGuards(JwtGuard)
  userProfile(@UserInfo('userId') id: string) {
    return this.userService.getDetailAndValidateUserById(id);
  }

  // resolver role
  // @ResolveField(() => Role, { nullable: true })
  // role(@Parent() user: User) {
  //   const { roleId } = user;

  //   return this.roleLoader.batchRoles.load(roleId);
  // }
}
