import API_ROUTES from "@/config/api-routes";
import API from "@/config/axios";
import { ILoginPayload, IRegisterPayload } from "@/types/auth";

// Just sample code, need to be modified
const authService = {
  login: async (credentials: ILoginPayload) => {
    const response = await API.post(API_ROUTES.AUTH.LOGIN, credentials);
    return response.data.metadata;
  },

  register: async (data: IRegisterPayload) => {
    const response = await API.post(API_ROUTES.AUTH.REGISTER, data);
    return response.data.metadata;
  },

  getCurrentUser: async () => {
    const response = await API.get(API_ROUTES.USER.ME);
    return response.data.metadata;
  },

  logout: async () => {
    const response = await API.post(API_ROUTES.AUTH.LOGOUT);
    return response.data.metadata;
  },
};

export default authService;
