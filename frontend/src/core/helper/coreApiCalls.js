import { isAuthenticated } from '../../auth/helper';
import {axiosInstance} from '../../axiosInstance';

export const getProducts = () => {
    return axiosInstance.get('product/',{
        headers: {
            Authorization: `Bearer ${isAuthenticated()}`
        }
    })
}