import axios from 'axios';



export default axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': 'c50c6699-6e58-4100-b3bc-17a010a33e0e'
    },
    withCredentials: true
});