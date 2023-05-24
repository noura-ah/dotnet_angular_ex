import { useLocation, useNavigate, useParams } from 'react-router-dom'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import ProjectForm from './ProjectForm'
import useAuth from '../../hooks/useAuth'
import { useEffect, useState } from 'react'


const UpdateProject = () => {
    const { id } = useParams()
    const axiosPrivate = useAxiosPrivate()
    const navigate = useNavigate()
    const { setAuth } = useAuth()
    const location = useLocation()

    const [project, setProject] = useState({
        name: '',
        description: ''
    })


    useEffect(() => {

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

    }, [])

    const handleSubmit = async (e, project) => {
        e.preventDefault()
        project.id=id

        try {
            await axiosPrivate.put(`/Project/${id}`, project)
            navigate('/')

        } catch (err) {
            setAuth({})
            localStorage.clear()
            navigate('/login', { state: { from: location }, replace: true })
        }

    }
    return (
        <ProjectForm btn="Update" title={"Edit project"} handleSubmit={handleSubmit} prevProject={project} />
    )
}

export default UpdateProject