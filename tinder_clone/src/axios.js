import axios from 'axios';

const instance = axios.create({
    baseURL : 'https://tcpp.herokuapp.com/'
})

export default instance;