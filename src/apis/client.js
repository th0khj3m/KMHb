import axios from "axios";
import { serverUrl } from "../api-config";

export default axios.create({
  baseURL: `${serverUrl}/api/`,
  withCredentials: true,
});
