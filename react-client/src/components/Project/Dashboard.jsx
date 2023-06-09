import { Link, useLocation, useNavigate } from "react-router-dom"
import useAxiosPrivate from "../../hooks/useAxiosPrivate"
import { useEffect, useState, useRef } from "react"
import useAuth from "../../hooks/useAuth"

const Dashboard = () => {
    const [projects, setProjects] = useState()
    const axiosPrivate = useAxiosPrivate()
    const navigate = useNavigate()
    const location = useLocation()
    const { setAuth } = useAuth()
    const [ isDeleted, setIsDeleted ] = useState(false)


    useEffect(() => {

        // to cancel request 
        const controller = new AbortController()

        const getProjects = async () => {
            try {
                const res = await axiosPrivate.get('/Project/', {
                    signal: controller.signal,
                })
                setProjects(res.data)
            }
            catch (err) {
                setAuth({})
                localStorage.clear()
                navigate('/login', { state: { from: location }, replace: true })
            }
        }

        getProjects()
        setIsDeleted(false)

    }, [isDeleted])

    const handleDelete = async (id) =>{
       const res = await axiosPrivate.delete(`/Project/${id}`)
       setIsDeleted(true)
    }

    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-300">
                                <thead className="bg-indigo-50">
                                    <tr>
                                        <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Id
                                        </th>
                                        <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Name</th>
                                        <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Description</th>
                                        <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        projects?.length ?
                                            projects.map((p, i) =>
                                                <tr>
                                                    <td
                                                        className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6"> {p.id}
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{p.name}</td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{p.description}
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                        <Link to={`/project/${p.id}/edit`}>edit </Link>
                                                        <button onClick={() => handleDelete(p.id)}>delete </button>
                                                        <Link to={`/project/${p.id}`}> details</Link>
                                                    </td>
                                                </tr>
                                            )
                                            : ''}
                                </tbody>
                            </table>
                        </div>
                        <div className="mt-3 font-semibold text-gray-900 ">
                            <Link to="/project/new"
                                className="font-bold text-xl py-1 px-2.5 m-1 shadow bg-indigo-50 ring-1 ring-black ring-opacity-5 rounded-full ">+</Link>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    )
}

export default Dashboard