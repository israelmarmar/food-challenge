import axios from 'axios';

const api = (url: string) => axios.create({
    baseURL: url
})

export default api;