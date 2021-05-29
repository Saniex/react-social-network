import axios from 'axios';



export default axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': 'ff2b99ed-164e-49f4-a27a-3fa471f7740e'
    },
    withCredentials: true
});