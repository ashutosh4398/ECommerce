import { isAuthenticated } from "../../auth/helper";
import { axiosInstance } from "../../axiosInstance";
import { API } from "../../backend";

export const showhistory = (link=`${API}order/purchase/history/`) => {
    return axiosInstance.get(link,{
        headers: {
            Authorization: `Bearer ${isAuthenticated()}`
        },
        baseURL: "",
    })
    
}