import API from '../utils/API';



const authAPI = {
    me: async () => {
        const response = await API.get('auth/me');

        return response.data;
    },
    logIn: async accountData => {
        const response = await API.post('auth/login', accountData);

        return response.data;
    },
    logOut: async () => {
        const response = await API.delete('auth/login');

        return response.data;
    }
}



export default authAPI;