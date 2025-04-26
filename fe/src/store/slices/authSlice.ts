import { IUser } from "@/types/user";
import { createSlice } from "@reduxjs/toolkit";
import { getMe, login, register } from "../actions/authAction";

// Just sample code, not complete
interface AuthState {
  user: IUser | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMe.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    });
    builder.addCase(getMe.rejected, (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    });
    builder.addCase(login.rejected, (state) => {
      state.user = null;
      state.isAuthenticated = false;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    });
    builder.addCase(register.rejected, (state) => {
      state.user = null;
      state.isAuthenticated = false;
    });
  },
});

export const { logout, setUser } = authSlice.actions;
export default authSlice.reducer;
