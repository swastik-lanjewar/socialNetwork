import axios from 'axios'
export default axios.create({
    headers: {
        baseURL:'http://localhost:8080/',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
})