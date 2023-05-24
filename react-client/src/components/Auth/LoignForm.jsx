import { useRef, useState, useEffect, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "../../services/api";
import{ setIdLocal, setTokenLocal }  from '../../context/AuthProvider'
import useAuth from "../../hooks/useAuth";

const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
const LoginrForm = () => {
    const { setAuth } = useAuth()
    const userRef = useRef()
    const errRef = useRef()

    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || '/'

    const [email, setEmail] = useState('')
    const [validEmail, setValidEmail] = useState(false)

    const [password, setPassword] = useState('')

    const [errMsg, setErrMsg] = useState('')

    useEffect(() => {
        userRef.current.focus()
    }, [])

    useEffect(() => {
        const result = EMAIL_REGEX.test(email)
        setValidEmail(result)
    }, [email])

    useEffect(() => {
        setErrMsg('')
    }, [email, password])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const test_email = EMAIL_REGEX.test(email)
        if (!test_email) {
            setErrMsg('Invalid Entry')
            return
        }
        try{
            const res = await axios.post('/Users/login/',{email,password},{withCredentials: true})
            const token = res.data.token
            const id = res.data.id
            setAuth({email,token,id})
            setIdLocal(id)
            setTokenLocal(token)
            navigate(from,{ replace: true})
        }catch(err){
            if(!err?.response.data)
                 setErrMsg('No Server Response')
            else if (err.response.data)
                setErrMsg(err.response.data.message)
            else 
                setErrMsg('Login faild')
            errRef.current.focus()
        }

    }


    return (
        <>
            <div className="p-3">
                {errMsg != '' ?
                    <div ref={errRef} className="text-red-500 bg-red-100 border p-2 border-red-500 rounded" style={errMsg ? { display: 'block' } : { display: 'hidden' }}>{errMsg}</div> : ''}

                <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-md">
                        <img className="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                            alt="Your Company" />
                        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Create a new Account</h2>
                    </div>

                    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                        <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
                            <form className="space-y-6" onSubmit={handleSubmit}>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                                    <div className="mt-2">
                                        <div
                                            className="flex flex-wrap items-stretch w-full relative bg-white items-center rounded w-full rounded-md border-0 p-0.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                            <input name="email"
                                                className="flex-shrink flex-grow flex-auto leading-normal w-px flex-1 border-0 h-10 border-grey-light rounded rounded-l-none px-3 self-center relative outline-none"
                                                type="text"
                                                id="email"
                                                ref={userRef}
                                                autoComplete="off"
                                                onChange={(e) => setEmail(e.target.value)}
                                                 />
                                        </div>
                                    </div>
                                    {!validEmail && email != '' ? <small className="text-red-500">Enter valid email address</small> : ''}

                                </div>

                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                                    <div className="mt-2">
                                        <div
                                            className="flex flex-wrap items-stretch w-full relative bg-white items-center rounded w-full rounded-md border-0 p-0.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                            <input name="password"
                                                className="flex-shrink flex-grow flex-auto leading-normal w-px flex-1 border-0 h-10 border-grey-light rounded rounded-l-none px-3 self-center relative outline-none"
                                                type="password"
                                                id="password"
                                                onChange={(e) => setPassword(e.target.value)}
                                                
                                            />

                                        </div>
                                    </div>


                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <input id="remember-me" name="remember-me" type="checkbox"
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" />
                                        <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">Remember me</label>
                                    </div>
                                </div>

                                <div>
                                    <button type="submit"
                                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign
                                        up</button>
                                </div >
                            </form >
                            <div className="font-medium mt-2 text-indigo-600 text-sm"><Link to='/signup'>Sign up</Link></div>

                        </div >
                    </div >
                </div >
            </div >
        </>

    )
}

export default LoginrForm