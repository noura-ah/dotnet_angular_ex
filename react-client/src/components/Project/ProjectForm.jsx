import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const ProjectForm = ({title, btn ,handleSubmit, prevProject}) => {
    const [project, setProject] = useState({
        name:'',
        description:''
    }) 

    useEffect(()=>{
        if (prevProject)
            setProject(prevProject)
    },[prevProject])
    

    const handleChanges = (e) =>{
        setProject({...project,[e.target.name]:e.target.value})
    }


    return (
        <div className="flex justify-center ">
            <form className="mt-10">

                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">{title}</h2>
                    <div className="mt-10 grid grid-cols-9 gap-x-9 gap-y-9 sm:grid-cols-6">
                        <div className="sm:col-span-12">
                            <label for="name" className="block text-sm font-medium leading-6 text-gray-900">Project name</label>
                            <div className="mt-2">
                                <div
                                    className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <input type="text" name="name" id="name" value={project.name}
                                        autoComplete="name" onChange={handleChanges}
                                        className="pl-4 block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" />
                                </div>
                            </div>
                        </div>

                        <div className="sm:col-span-12">
                            <label for="description" className="block text-sm font-medium leading-6 text-gray-900">Project
                                Description</label>
                            <div className="mt-2">
                                <div
                                    className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <textarea type="text" name="description" id="description" value={project.description}
                                        autoComplete="description" onChange={handleChanges}
                                        className="pl-4 block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <Link className="text-sm font-semibold leading-6 text-gray-900" to="/">Cancel</Link>
                    <button type="submit" onClick={(e) => handleSubmit(e,project)}
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">{btn}</button>
                </div>
            </form>
        </div>
    )
}
export default ProjectForm