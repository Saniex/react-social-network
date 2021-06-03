import API from '../utils/API';



const usersAPI = {
    getUsers: async (count = 10, page = 1, term = '', friend = '') => {
        const followData = await API.get(`users?count=${count}&page=${page}&term=${term}&friend=${friend}`);

        return followData.data;
    },
}



export default usersAPI;