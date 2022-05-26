import axios from 'axios'
export default axios.create({
    headers: {
        baseURL: 'http://localhost:3000/',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
})