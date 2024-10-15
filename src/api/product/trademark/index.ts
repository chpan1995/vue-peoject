import request from "@/utils/request";
import type { TradeMarkResponseData } from "./type";

enum API {
    LOGIN_URL = '/admin/product/baseTrademark/'
}

export const reqHasTrademark = (page:number,limit:number) => { return request.get<any,TradeMarkResponseData>(API.LOGIN_URL+`${page}/${limit}`) }