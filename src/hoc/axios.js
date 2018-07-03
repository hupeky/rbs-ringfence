import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://rbsringfence.firebaseio.com/'
})

export default axiosInstance
