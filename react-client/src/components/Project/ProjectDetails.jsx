import { useEffect, useState } from "react"
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import useAuth from '../../hooks/useAuth'



const ProjectDetails = () => {
    const { id } = useParams()
    const [project, setProject] = useState({
        name:'', description:''
    })
    const axiosPrivate = useAxiosPrivate()
    const navigate = useNavigate()
    const { setAuth } = useAuth()
    const location = useLocation()

    useEffect(()=>{
        const controller = new AbortController()

        const getProject = async () => {

            try {
                const res = await axiosPrivate.get(`/Project/${id}`, {
                    signal: controller.signal,
                })
                setProject(res.data)
            } catch (err) {
                setAuth({})
                localStorage.clear()
                navigate('/login', { state: { from: location }, replace: true })
            }
        }
        getProject()

        return () => {
            controller.abort()
        }

    },[])

    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                            <h2 className="font-semibold text-3xl p-2">{ project.name }</h2>
                            <p className="p-2">{ project.description }</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProjectDetails