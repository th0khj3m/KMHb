import API from "./client";

export const addRooms = async () => {
  try {
    const response = await API.post("rooms");
    return response.data;
  } catch (err) {
    throw err.response.data;
  }
};