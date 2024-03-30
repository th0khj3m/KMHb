import API from './client';

// API interface for logging a user in 
export const login = async (credentials) => {
    try {
        const response = await API.post('auth/login', credentials);
        return response.data;
    } catch (err) {
       throw err;
    }
}

// API interface for registering a user
export const register = async (credentials) => {
    try {
        const response = await API.post('auth/register', credentials);
        return response.data;
    } catch (err) {
        throw err;
    }
}