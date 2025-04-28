import { createAsyncThunk } from "@reduxjs/toolkit";
import authService from "@/services/authService";
import { ILoginPayload, IRegisterPayload } from "@/types/auth";
import { AxiosError } from "axios";

// Get current user action
export const getMe = createAsyncThunk(
  "auth/me",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        return rejectWithValue("No token found");
      }
      return await authService.getCurrentUser();
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Login action
export const login = createAsyncThunk(
  "auth/login",
  async (credentials: ILoginPayload, { rejectWithValue }) => {
    try {
      const data = await authService.login(credentials);
      const { access_token, refresh_token } = data;
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("refresh_token", refresh_token);
      return data.user;
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      return rejectWithValue(axiosError.response?.data || "Login failed");
    }
  }
);

// Register action
export const register = createAsyncThunk(
  "auth/register",
  async (payload: IRegisterPayload, { rejectWithValue }) => {
    try {
      const { access_token, refresh_token, user } = await authService.register(
        payload
      );
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("refresh_token", refresh_token);
      return user;
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || "Registration failed"
      );
    }
  }
);

// Logout action
export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      return await authService.logout();
    } catch (error) {
      return rejectWithValue("Logout failed");
    }
  }
);
