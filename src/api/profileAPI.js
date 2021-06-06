import API from '../utils/API';



const profileAPI = {
    getStatus: async ID => {
        const statusData = await API.get(`profile/status/${ID}`);

        return statusData.data;
    },
    getProfile: async ID => {
        const profileData = await API.get(`profile/${ID}`);

        return profileData.data;
    }
}



export default profileAPI;