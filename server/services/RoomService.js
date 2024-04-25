import RoomModel from "../models/room";
const RoomModelInstance = new RoomModel();

export default class RoomService {
  async loadRooms() {
    try {
      const results = await RoomModelInstance.find();
      return results;
    } catch (err) {
      throw err;
    }
  }


  async addRoom(name) {
    try {
      const results = await RoomModelInstance.createRoom({ name });
      return results;
    } catch (err) {
      throw err;
    }
  }

  async getRoomMessages(roomId) {
    try {
      const results = await RoomModelInstance.getMessages(roomId);
      return results;
    } catch (err) {
      throw err;
    }
  }

  async addMessage(data) {
    try {
      const results = await RoomModelInstance.createMessage(data);
      return results;
    } catch (err) {
      throw err;
    }
  }
}
