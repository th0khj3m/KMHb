import createError from "http-errors";
import UserModel from "../models/user.js";
const UserModelInstance = new UserModel();

export default class UserService {
  async get(data) {
    const { id } = data;
    try {
      const user = await UserModelInstance.findOneById(id);
      if (!user) {
        throw createError(404, "User record not found");
      }

      return user;
    } catch (err) {
      throw err;
    }
  }
}
