import axios from 'axios'
export default axios.create({
    // baseURL: 'http://localhost:3000',
    baseURL: 'https://letsbug-social-network.herokuapp.com/',
    headers: {  
        // set headers for post requests and put reqeusts and get requests
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
})