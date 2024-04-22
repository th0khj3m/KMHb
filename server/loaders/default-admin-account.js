import UserService from "../services/UserService.js";
const UserServiceInstance = new UserService();
import AuthService from "../services/AuthService.js";
const AuthServiceInstance = new AuthService();

export default async function DefaultAdminAccount() {
  try {
    const exisitingAdmin = await UserServiceInstance.getUserByRole(1); // Assuming a UserService with getUserRole method
    if (!exisitingAdmin) {
      await AuthServiceInstance.register({
        username: "admin",
        password: "admin1",
        email: "admin@gmail.com",
        role_id: 1,
      });
    }
  } catch (err) {
    throw err;
  }
}
