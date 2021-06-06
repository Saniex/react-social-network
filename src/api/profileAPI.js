import API from '../utils/API';



const profileAPI = {
    getStatus: async ID => {
        const statusData = await API.get(`profile/status/${ID}`);

        return statusData.data;
    },
    setStatus: async status => {
        const statusData = await API.put(`profile/status`, { status });

        return statusData;
    },
    getProfile: async ID => {
        const profileData = await API.get(`profile/${ID}`);

        return profileData.data;
    },
    setProfile: async profileInfo => {
        const profileData = await API.put(`profile`, profileInfo);

        return profileData;
    },
    setPhoto: async photo => {
        const photoData = await API.put('profile/photo', photo);

        return photoData.data;
    }
}



export default profileAPI;