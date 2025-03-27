import API from "@/config/axios";
import { ILoginPayload, IRegisterPayload } from "@/types/auth";

// Just sample code, need to be modified
const authService = {
  login: async (credentials: ILoginPayload) => {
    const response = await API.post("/login", credentials);
    return response.data;
  },

  register: async (data: IRegisterPayload) => {
    const response = await API.post("/register", data);
    return response.data;
  },

  logout: async () => {
    await API.post("/logout");
  },

  getCurrentUser: async () => {
    const response = await API.get("/me");
    return response.data;
  },
};

export default authService;
