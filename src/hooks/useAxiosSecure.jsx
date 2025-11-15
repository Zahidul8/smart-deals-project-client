import axios from "axios";
import { useEffect } from "react";
import useAuth from "./useAuth";

const axiosInstance = axios.create({
    baseURL:'https://smart-deals-project-server.vercel.app'
})

const useAxiosSecure = () => {
    const {user} = useAuth();

    useEffect(() => {
        const requestInterceptor = axiosInstance.interceptors.request.use((config)=> {
            const token = user.accessToken;
            if (token) {
                
                config.headers.authorization = `Bearer ${token}`;
            }
            return config;
        })

        return () => {
            axiosInstance.interceptors.request.eject(requestInterceptor);
        }
    },[user])
    
    return axiosInstance;
};

export default useAxiosSecure;