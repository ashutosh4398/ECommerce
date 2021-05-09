import axios from 'axios';
import { isAuthenticated, Signout,refreshAccessToken } from './auth/helper';
import {API} from './backend';

export const axiosInstance = axios.create({
    baseURL: API
})

const handleRefreshQueue = async () => {
    try {
        const data = await refreshAccessToken()
        return new Promise((resolve,reject) => {
            if (data) {
                resolve("CALL_ORIGINAL_REQUEST");
            } else {
                reject("SIGNOUT");
            }
        })
        
    } catch(err) {
        //...
    }
}

axiosInstance.interceptors.response.use(resp => resp, error => {
    const originalRequest = error.config;
    
    if (error.response.data?.code === "token_not_valid" && !originalRequest._retry) {
        // NOTE: 401 indicates ACCESS_TOKEN_EXPIRED
        // now we have to fire API for token refresh
        console.log("TOKEN REFRESH REQUIRED")
        originalRequest._retry = true;
        return handleRefreshQueue()
            .then(resp => {
                originalRequest.headers['Authorization'] = `Bearer ${isAuthenticated()}`;
                return axiosInstance.request(originalRequest)
            })
            .catch(err => {
                Signout(() => {
                    // USED BASIC JS BECAUSE WE ARE UNABLE TO REDIRECT USING HISTORY,LINKS
                    // FROM INTERCEPTORS
                    // LOGIC CAN BE REVISITED LATER IF WE COULD FIND SOME SOLUTION
                    // KIND OF A HACK USED FOR NOW
                    window.location.href="/signin";
                });
            })
    }
    return error;
})