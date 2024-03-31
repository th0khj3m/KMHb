import API from './client';

export const addListAPI = async (listData) => {
    try {
        const response = await API.post('lists', listData);
        return response.data;
    } catch (err) {
        throw err.response.data;
    }
}