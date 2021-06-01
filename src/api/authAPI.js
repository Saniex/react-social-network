import API from '../utils/API';



const authAPI = {
    me: async () => {
        const authData = await API.get('auth/me');

        return authData.data;
    },
}



export default authAPI;