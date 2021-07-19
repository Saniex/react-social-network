import API from '../utils/API';



const usersAPI = {
    getUsers: async ({ count = 10, page = 1, term = '', friend = '' }) => {
        const response = await API.get(`users?count=${count}&page=${page}&term=${term}&friend=${friend}`);

        return response.data;
    },
}



export default usersAPI;