import { Link, useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const Navbar = () => {
    const { auth, setAuth } = useAuth()
    const navigate = useNavigate()

    const logout = () =>{
        setAuth({})
        navigate('/login')
    }

    return (
        <nav className="bg-gray-800">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        <button type="button"
                            className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                            aria-controls="mobile-menu" aria-expanded="false">
                            <span className="sr-only">Open main menu</span>

                            <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" srokeWidth="1.5" stroke="currentColor"
                                aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>

                            <svg className="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"
                                aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="flex flex-shrink-0 items-center">
                            <img className="block h-8 w-auto lg:hidden"
                                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company" />
                            <img className="hidden h-8 w-auto lg:block"
                                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company" />
                        </div>
                        <div className="hidden sm:ml-6 sm:block">
                            <div className="flex space-x-4">

                                <Link className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium" to={'/'}>Dashboard</Link>
                                
                                <Link className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium" to={'/project/new'}>New</Link>
                                <a href="#"
                                    className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Projects</a>
                                <a href="#"
                                    className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Calendar</a>
                            </div>
                        </div>
                    </div>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">


                        <div className="relative ml-3">
                            {auth.token?
                                <div >
                                    <button onClick={logout} type="button" className="flex rounded-full bg-gray-800 text-sm"
                                        id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                            className="bi bi-escape text-white" viewBox="0 0 16 16">
                                            <path
                                                d="M8.538 1.02a.5.5 0 1 0-.076.998 6 6 0 1 1-6.445 6.444.5.5 0 0 0-.997.076A7 7 0 1 0 8.538 1.02Z" />
                                            <path
                                                d="M7.096 7.828a.5.5 0 0 0 .707-.707L2.707 2.025h2.768a.5.5 0 1 0 0-1H1.5a.5.5 0 0 0-.5.5V5.5a.5.5 0 0 0 1 0V2.732l5.096 5.096Z" />
                                        </svg>
                                    </button>
                                </div>
                                :
                                <div>
                                    <Link to={'/login'} className="flex text-white font-bold rounded-full bg-gray-800 text-sm"
                                        id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                                        Login
                                    </Link>
                                </div>
                            }

                        </div>
                    </div>
                </div>
            </div>


            <div className="sm:hidden" id="mobile-menu">
                <div className="space-y-1 px-2 pb-3 pt-2">
                    <a href="#" className="bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium"
                        aria-current="page">Dashboard</a>
                    <a href="#"
                        className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Team</a>
                    <a href="#"
                        className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Projects</a>
                    <a href="#"
                        className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Calendar</a>
                </div>
            </div>
        </nav>
    )
}
export default Navbar
