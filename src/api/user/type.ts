interface dataType {
    token?:string,
    message?:string
}

// 登录结构返回的数据

export interface loginResponseData {
    code: number
    data: dataType
}