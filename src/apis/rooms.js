import API from "./client";

export const fetchRooms = async () => {
  try {
    const response = await API.get("rooms");
    return response.data;
  } catch (err) {
    throw err.response.data;
  }
};

export const fetchMessages = async (room_id) => {
  try {
    const response = await API.get(`rooms/${room_id}/messages`);
    return response.data;
  } catch (err) {
    throw err.response.data;
  }
};

export const createRoom = async (name) => {
  try {
    const response = await API.post("rooms", { name });
    return response.data;
  } catch (err) {
    throw err.response.data;
  }
};

export const update = async ({ room_id, name }) => {
  try {
    const response = await API.put(`rooms/${room_id}`, { name });
    return response.data;
  } catch (err) {
    throw err.response.data;
  }
};

export const remove = async (room_id) => {
  try {
    const response = await API.delete(`rooms/${room_id}`);
    return response.data;
  } catch (err) {
    throw err.response.data;
  }
};
