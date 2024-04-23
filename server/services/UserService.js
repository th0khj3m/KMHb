import createError from "http-errors";
import UserModel from "../models/user.js";
const UserModelInstance = new UserModel();

export default class UserService {
  async loadUsers() {
    try {
      const users = await UserModelInstance.find();
      return users;
    } catch (err) {
      throw err;
    }
  }

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

  async getUserByRole(data) {
    try {
      const user = await UserModelInstance.findOneByRole(data);
      return user;
    } catch (err) {
      throw err;
    }
  }

  async getUserRole(data) {
    try {
      const { id } = data;
      const role = await UserModelInstance.findUserRole(id);
      if (!role) {
        throw createError(404, "Role not found");
      }
      return role;
    } catch (err) {
      throw err;
    }
  }

  async deleteUsers(data) {
    try {
      const response = await UserModelInstance.delete(data);
      return response;
    } catch (err) {
      throw err;
    }
  }
}
