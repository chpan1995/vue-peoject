import type { RouteRecordRaw } from 'vue-router'
export default interface UserState{
    token: string | null,
    menuRoutes:RouteRecordRaw,
    username:string,
    avatar:string
}