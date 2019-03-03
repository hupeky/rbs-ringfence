import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://rbs-ringfence.firebaseio.com/'
})

export default axiosInstance
