import API from '../utils/API';



const followAPI = {
    checkFollow: async ID => {
        const followData = await API.get(`follow/${ID}`);

        return followData.data;
    },
    getFollow: async ID => {
        const followData = await API.post(`follow/${ID}`);

        return followData.data;
    },
    getUnfollow: async ID => {
        const unfollowData = await API.delete(`follow/${ID}`);

        return unfollowData.data;
    }
}



export default followAPI;