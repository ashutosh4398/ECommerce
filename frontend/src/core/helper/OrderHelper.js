import { isAuthenticated } from "../../auth/helper";
import { axiosInstance } from "../../axiosInstance";


export const createOrder = (orderData,orderID) => {
    const formData = {}
    for (const name in orderData) {
        formData[name] = orderData[name];
    }

    return axiosInstance.put(`order/${orderID}/`,formData,{
        headers: {
            Authorization: `Bearer ${isAuthenticated()}`
        }
    })
}