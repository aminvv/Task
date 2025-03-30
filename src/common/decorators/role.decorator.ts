import { SetMetadata } from "@nestjs/common"
import { Roles } from "../enums/role.enums"

export const ROLE_KEY="ROLES"
export const  Role=( ...roles:Roles[])=>SetMetadata(ROLE_KEY,roles)