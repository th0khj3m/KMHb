import API from "./client";

export const fetchRooms = async () => {
  try {
    const response = await API.get("rooms");
    return response.data;
  } catch (err) {
    throw err.response.data;
  }
};

export const createRoom = async (name) => {
  try {
    const response = await API.post("rooms", {name});
    return response.data;
  } catch (err) {
    throw err.response.data;
  }
};
