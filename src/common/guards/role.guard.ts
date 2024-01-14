import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ALLOWED_PERMISSION } from '../decorators/permission.decorator';
import { RolePermission } from '../../app/auth/role/entities/role-permission.entity';
import { User } from '../../app/user/entities/user.entity';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  private mapPermissionsToMenuAndActions(permissions: string[]) {
    let menuAndActions: { menu: string; actions: string[] }[] = [];

    permissions.forEach((permission: string) => {
      const [menuName, actionName] = permission.split('.');

      const isExists = menuAndActions.find((m) => m.menu === menuName);
      if (isExists)
        menuAndActions[menuAndActions.findIndex((m) => m.menu === menuName)][
          'actions'
        ].push(actionName);
      else menuAndActions.push({ menu: menuName, actions: [actionName] });
    });

    return menuAndActions;
  }

  private getUserRolePermissions(user: User) {
    return user.role.permissions.map((permission: RolePermission) => ({
      code: permission.permissionCode,
      actions: permission.actions as string[],
    }));
  }

  private filterUserPermissionsAndResourcePermissions(
    userPermissions: { code: string; actions: string[] }[],
    menuAndActions: { menu: string; actions: string[] }[],
  ) {
    const results = userPermissions.map((userPermission) => {
      const { actions, code } = userPermission;
      const menuAndAction = menuAndActions.find((m) => m.menu === code);
      if (!menuAndAction) return false;

      const { actions: givenActions } = menuAndAction;

      const isIncluded = givenActions.every((action) =>
        actions.includes(action),
      );
      return isIncluded;
    });

    return results.filter((result) => result).length > 0;
  }

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const user = ctx.getContext().req?.user;

    const permissions = this.reflector.get(
      ALLOWED_PERMISSION,
      ctx.getHandler(),
    );

    const menuAndActions = this.mapPermissionsToMenuAndActions(permissions);
    const userPermissions = this.getUserRolePermissions(user);

    return this.filterUserPermissionsAndResourcePermissions(
      userPermissions,
      menuAndActions,
    );
  }
}
