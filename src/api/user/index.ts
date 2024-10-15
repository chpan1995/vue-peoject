import request from "@/utils/request";

enum API {
    LOGIN_URL = '/admin/acl/index/login',
    USERINFO = '/admin/acl/index/info',
    LOGOUT = '/admin/acl/index/logout'
}

export interface loginForm {
    username: string,
    password: string
}

export interface loginResponse {
    code: number,
    data: {
        token: string
    }
}

export const reqlogin = (data: loginForm) => { return request.post<any, any>(API.LOGIN_URL, data) }

export const reqUserinfo = () => { return request.get<any,any>(API.USERINFO) }

export const reqUserlogout = () => { return request.post<any,any>(API.LOGOUT) }
