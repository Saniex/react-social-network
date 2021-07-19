import API from '../utils/API';



const followAPI = {
    checkFollow: async ID => {
        const response = await API.get(`follow/${ID}`);

        return response.data;
    },
    getFollow: async ID => {
        const response = await API.post(`follow/${ID}`);

        return response.data;
    },
    getUnfollow: async ID => {
        const response = await API.delete(`follow/${ID}`);

        return response.data;
    }
}



export default followAPI;