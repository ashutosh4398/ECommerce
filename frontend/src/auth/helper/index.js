import axios from 'axios';
import {axiosInstance} from '../../axiosInstance';
import { API } from '../../backend';
// AFTER SIGNOUT PREP:
import {cartEmpty} from '../../core/helper/CartHelper';
export const signup = (user) => {
    return axiosInstance.post("user/", JSON.stringify(user) , {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        }
    });
}

export const signin = (user) => {
    const formData = new FormData();
    for (const name in user) {
        formData.append(name, user[name]);
    }
    return axiosInstance.post("user/token/",formData);
}

export const authenticate = (data,next) => {
    if(typeof window !== undefined) {
        localStorage.setItem("jwt",JSON.stringify(data.access));
        localStorage.setItem("refresh",JSON.stringify(data.refresh));
        next();
    }
}

export const isAuthenticated = () => {
    if (typeof window === undefined) {
        return false
    }
    if (localStorage.getItem("jwt")) {
        return JSON.parse(localStorage.getItem("jwt"));
    } else {
        return false;
    }
}

export const Signout = (next) => {
    
    if (typeof window !== undefined) {
        localStorage.removeItem("jwt");
        cartEmpty(() => {});
        next();
    }
}

export const refreshAccessToken = () => {
    return axios.post(`${API}user/token/refresh/`,{
        refresh: JSON.parse(localStorage.getItem('refresh'))
    })
    .then(resp => {
        // console.log(resp);
        localStorage.setItem("jwt",JSON.stringify(resp.data?.access));
        return resp.data?.access;
    })
    .catch(err => {
        return false;
    })
}