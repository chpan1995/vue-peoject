import request from "@/utils/request";
import type { TradeMarkResponseData,TradeMark} from "./type";

enum API {
    LOGIN_URL = '/admin/product/baseTrademark/',
    ADDTRADEMARK_URL = '/admin/product/baseTrademark/save',
}

export const reqHasTrademark = (page:number,limit:number) => { return request.get<any,TradeMarkResponseData>(API.LOGIN_URL+`${page}/${limit}`) }

export const reqAddorUpdateTradeMark = (data:TradeMark) => { 
    // 修改数据
    if(data.id) {
        return request.put<any,any>(API.ADDTRADEMARK_URL,data);
    }else {
    //添加数据
        return request.post<any,any>(API.ADDTRADEMARK_URL,data);
    }
 }