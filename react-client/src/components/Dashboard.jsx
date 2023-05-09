import axios from "../services/api"
import { useEffect, useState, useRef } from "react"

const Dashboard = () => {
    const [projects, setProjects] = useState()
    const [errMsg, setErrMsg] = useState()
    const errRef = useRef()


    useEffect(() => {

        // to cancel request 
        const controller = new AbortController()
        const getProjects = async () => {
            try {
                const res = await axios.get('/Project/', {
                    signal:controller.signal ,
                    headers: {
                        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFsaUBtYWlsLmNvbSIsIm5iZiI6MTY4MzU0OTExMiwiZXhwIjoxNjgzNjM1NTEyLCJpYXQiOjE2ODM1NDkxMTJ9.hUxyC9qtsTnJjerTy2lVTvB4TSeH7Lvq6Jsl_MeanWg'
                    }
                })
                console.log(res.data)
                setProjects(res.data)
            }
            catch (err) {
                if (err.response.status == '401')
                    setErrMsg('Unauthorized')
                else if (err.response.data)
                    setErrMsg(err.response.data.message)
                else
                    setErrMsg('No projects to display')
                // errRef.current.focus()
            }
        }

        getProjects()

        return () => {
            controller.abort()
        } 
    }, [])

    return (
        <div>{
            projects?.length ?
                <ul>{projects.map((p, i) => <li key={i}>{p.name}</li>)}</ul>
                : <p>{errMsg}</p>}</div>
    )
}

export default Dashboard