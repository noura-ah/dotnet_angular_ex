import { useLocation, useNavigate } from 'react-router-dom'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import ProjectForm from './ProjectForm'
import useAuth from '../../hooks/useAuth'


const CreateProject = () => {
    const axiosPrivate = useAxiosPrivate()
    const navigate = useNavigate()
    const { setAuth } = useAuth()
    const location = useLocation()

    const handleSubmit = async (e, project) => {
        e.preventDefault()

        const controller = new AbortController()

        try {
            const res = await axiosPrivate.post('/Project/', project, {
                signal: controller.signal,
            })

            navigate('/')

        } catch (err) {
            setAuth({})
            localStorage.clear()

            navigate('/login', { state: { from: location }, replace: true })
        }

    }
    return (
        <ProjectForm btn="submit" title={"Create a new project"} handleSubmit={handleSubmit} />
    )
}

export default CreateProject