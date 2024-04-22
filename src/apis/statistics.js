import API from "./client";

export const fetchTotalOvertime = async () => {
  try {
    const response = await API.get(`statistics/totalOvertime`);
    return response.data;
  } catch (err) {
    throw err.response.data;
  }
};

export const fetchTodayRatings = async () => {
  try {
    const response = await API.get(`statistics/todayRatings`);
    return response.data;
  } catch (err) {
    throw err.response.data;
  }
};

export const fetchTodayReviews = async () => {
  try {
    const response = await API.get(`statistics/todayReviews`);
    return response.data;
  } catch (err) {
    throw err.response.data;
  }
};

export const fetchTodayRegistrations = async () => {
  try {
    const response = await API.get(`statistics/todayRegistrations`);
    return response.data;
  } catch (err) {
    throw err.response.data;
  }
};
