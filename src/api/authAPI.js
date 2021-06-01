import API from '../utils/API';



const authAPI = {
    me: async () => {
        const authData = await API.get('auth/me');

        return authData.data;
    },
    logIn: async accountData => {
        const logInData = await API.post('auth/login', accountData);

        return logInData.data;
    },
    logOut: async () => {
        const logOutData = await API.delete('auth/login');

        return logOutData.data;
    }
}



export default authAPI;