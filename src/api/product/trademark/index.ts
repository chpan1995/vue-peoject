import request from "@/utils/request";
import type { TradeMarkResponseData, TradeMark } from "./type";

enum API {
    LOGIN_URL = '/admin/product/baseTrademark/',
    ADDTRADEMARK_URL = '/admin/product/baseTrademark/save',
    //修改已有品牌
    UPDATETRADEMARK_URL = '/admin/product/baseTrademark/update',
    DELETE_URL = '/admin/product/baseTrademark/remove/',
}

export const reqHasTrademark = (page: number, limit: number) => { return request.get<any, TradeMarkResponseData>(API.LOGIN_URL + `${page}/${limit}`) }

export const reqAddorUpdateTradeMark = (data: TradeMark) => {
    // 修改数据
    if (data.id) {
        return request.put<any, any>(API.UPDATETRADEMARK_URL, data);
    } else {
        //添加数据
        return request.post<any, any>(API.ADDTRADEMARK_URL, data);
    }
}

export const reqDeleteTrademark = (id: number) => {
    return request.delete<any, any>(API.DELETE_URL + id);
}