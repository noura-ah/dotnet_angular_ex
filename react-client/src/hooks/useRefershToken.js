import axios from "../services/api";
import useAuth from "./useAuth";

const useRefreshToken = () => {
    const { setAuth, auth } = useAuth()


    const refresh = async () => {
        const response = await axios.get('Users/refresh', { params: { id: auth?.id }, withCredentials: true })
        setAuth(prev => {
            return { ...prev, token: response.data }
        })

        return response
    }

    return refresh
}

export default useRefreshToken