import createError from "http-errors";
import bcrypt from "bcrypt";

import UserModel from "../models/user.js";
const UserModelInstance = new UserModel();

export default class AuthService {
  async login(data) {
    const { username, password } = data;
    try {
      // Check if user exists
      const user = await UserModelInstance.findOneByUsername(username);

      // If no user found, reject
      if (!user) {
        throw createError(
          401,
          "Your login credentials do not match the account in the system"
        );
      }

      // If user found but password is incorrect
      const match = await bcrypt.compare(password, user.password_hash);
      if (!match) {
        throw createError(401, "Incorrect password");
      }

      return user;
    } catch (err) {
      throw err;
    }
  }

  async register(data) {
    const { username, password, email, role_id = 2 } = data;
    try {
      // Check if email already exists
      const userEmail = await UserModelInstance.findOneByEmail(email);

      if (userEmail) {
        throw createError(422, "Email already exists");
      }

      // Check if username already exists
      const userUsername = await UserModelInstance.findOneByUsername(username);

      if (userUsername) {
        throw createError(422, "Username already exists");
      }

      // Generate salt
      const salt = await bcrypt.genSalt(10);
      // Hash password
      const hashedPassword = await bcrypt.hash(password, salt);

      const newData = {
        username,
        password_hash: hashedPassword,
        email,
        role_id, // Default role_id value (2 for regular users)
      };

      // User doesnt exist, create new user record
      return await UserModelInstance.create(newData);
    } catch (err) {
      throw err;
    }
  }

  

  async googleLogin(profile) {
    const { id, displayName } = profile;
    try {
      // Check if user exists
      const user = await UserModelInstance.findOneByGoogleId(id);
      if (!user) {
        return await UserModelInstance.create({ google: { id, displayName } });
      }

      return user;
    } catch (err) {
      throw err;
    }
  }

  async facebookLogin(profile) {
    const { id, displayName } = profile;

    try {
      // Check if user exists
      const user = await UserModelInstance.findOneByFacebookId(id);

      // If no user found, create new user
      if (!user) {
        return await UserModelInstance.create({
          facebook: { id, displayName },
        });
      }

      // User already exists, return profile
      return user;
    } catch (err) {
      throw createError(500, err);
    }
  }
}
