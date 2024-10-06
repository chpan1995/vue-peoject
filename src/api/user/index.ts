import request from "@/utils/request";

enum API {
    LOGIN_URL = '/user/login',
    USERINFO = '/user/info'
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

export const reqlogin = (data: loginForm) => { return request.post<any, loginResponse>(API.LOGIN_URL, data) }

export const reqUserinfo = () => { request.get<any>(API.USERINFO) }
