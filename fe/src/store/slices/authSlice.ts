import { IUser } from "@/types/user";
import { createSlice } from "@reduxjs/toolkit";
import { getMe, login, register, logout } from "../actions/authAction";

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

    builder.addCase(logout.fulfilled, (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
    }
    );
    builder.addCase(logout.rejected, (state) => {
      state.user = null;
      state.isAuthenticated = false;
    }
    );
  },
});

export const {  setUser } = authSlice.actions;
export default authSlice.reducer;
