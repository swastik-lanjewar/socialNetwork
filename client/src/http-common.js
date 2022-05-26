import axios from 'axios'
export default axios.create({
    baseURL: 'https://letsbug-social-network.herokuapp.com/',
    headers: {  
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
})