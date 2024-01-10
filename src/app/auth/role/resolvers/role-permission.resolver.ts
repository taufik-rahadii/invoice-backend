import { Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { RolePermission } from "../entities/role-permission.entity";
import { Permission } from "../../permission/entities/permission.entity";
import { PermissionLoader } from "../../permission/services/permission.loader";

@Resolver(() => RolePermission)
export class RolePermissionResolver {
    constructor(private readonly permissionLoader: PermissionLoader) {}

    @ResolveField(() => Permission)
    permissionDetail(@Parent() rolePermission: RolePermission) {
        const {permissionCode} = rolePermission

        return this.permissionLoader.singlePermission.load(permissionCode)
    }
}