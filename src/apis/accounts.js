import API from "./client";

export const fetchAccounts = async () => {
  try {
    const response = await API.get("users");
    return response.data;
  } catch (err) {
    throw err.response.data;
  }
};

export const deleteAccounts = async (data) => {
  try {
    const response = await API.delete("users", { data });
    return response.data;
  } catch (err) {
    throw err.response.data;
  }
};
