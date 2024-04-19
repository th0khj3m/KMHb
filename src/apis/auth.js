import API from "./client";

// API interface for logging a user in
export const login = async (credentials) => {
  try {
    const response = await API.post("auth/login", credentials);
    return response.data;
  } catch (err) {
    throw err.response.data;
  }
};

// API interface for registering a user
export const register = async (credentials) => {
  try {
    const response = await API.post("auth/register", credentials);
    return response.data;
  } catch (err) {
    throw err.response.data;
  }
};

export const isLoggedIn = async () => {
  try {
    const response = await API.get("auth/logged_in");
    return response.data;
  } catch (err) {
    throw err.response.data;
  }
};

export const logout = async () => {
  try {
    await API.get("auth/logout");
  } catch (err) {
    throw err;
  }
}


