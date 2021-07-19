import API from '../utils/API';



const profileAPI = {
    getStatus: async ID => {
        const response = await API.get(`profile/status/${ID}`);

        return response.data;
    },
    setStatus: async status => {
        const response = await API.put(`profile/status`, { status });

        return response.data;
    },
    getProfile: async ID => {
        const response = await API.get(`profile/${ID}`);

        return response.data;
    },
    setProfile: async profileInfo => {
        const response = await API.put(`profile`, profileInfo);

        return response.data;
    },
    setPhoto: async photo => {
        const response = await API.put('profile/photo', photo);

        return response.data;
    }
}



export default profileAPI;