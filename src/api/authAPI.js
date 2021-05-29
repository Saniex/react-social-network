import samuraiAPI from '../utils/API';



const authAPI = {
    me: async () => {
        const authData = await samuraiAPI.get('auth/1me');

        return authData.data;
    },
}



export default authAPI;