import {axiosInstance} from '../../axiosInstance';
import {isAuthenticated} from '../../auth/helper';

export const getmeToken = () => {
    return axiosInstance.get('payment/gettoken/',{
        headers: {
            Authorization: `Bearer ${isAuthenticated()}`
        }
    })
}

export const processPayment = (paymentInfo) => {
    const formData = new FormData()
    for (const key in paymentInfo) {
        formData.append(key, paymentInfo[key]);
    }
    return axiosInstance.post('payment/process/',formData,{
        headers: {
            Authorization: `Bearer ${isAuthenticated()}`
        }
    })
}