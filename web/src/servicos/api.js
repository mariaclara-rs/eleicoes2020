import axios from 'axios';

//fazer acesso a base 
const api = axios.create({
    baseURL: 'http://localhost:3344'
});
export default api;
