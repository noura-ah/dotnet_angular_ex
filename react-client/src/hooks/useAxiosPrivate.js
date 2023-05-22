import { axiosPrivate } from "../services/api";
import { useEffect } from "react";
import useRefreshToken from "./useRefershToken";
import useAuth from "./useAuth";
import { setTokenLocal } from "../context/AuthProvider";

const useAxiosPrivate = () => {
    const refresh = useRefreshToken()
    const { auth, setAuth } = useAuth()

    useEffect(() => {

        const requestIntercept = axiosPrivate.interceptors.request.use(
            config => {
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${auth?.token}`
                }
                return config
            },
        )

        const responseIntercept = axiosPrivate.interceptors.response.use(
            res => res , async (err) => {
                const prevReq = err?.config
                if (err?.response?.status === 401 && !prevReq?.sent ) {
                    prevReq.sent = true
                    const newToken = await refresh()
                    setAuth({...auth,token: newToken.data})
                    prevReq.headers["Authorization"] = `Bearer ${newToken.data}`
                    return axiosPrivate(prevReq)
                }
                return Promise.reject(err)
            }
        )
        
        setTokenLocal(auth.token)
        
        
        return () => {
            axiosPrivate.interceptors.response.eject(responseIntercept)
            axiosPrivate.interceptors.request.eject(requestIntercept)
        }
    }, [auth, refresh])
    return axiosPrivate
}

export default useAxiosPrivate