import axios from 'axios'

export default axios.create({
    baseURL:'https://localhost:7067/api/'
})