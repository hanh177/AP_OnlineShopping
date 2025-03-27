import { createAsyncThunk } from "@reduxjs/toolkit";
import authService from "@/services/authService";
import { ILoginPayload, IRegisterPayload } from "@/types/auth";
import { AxiosError } from "axios";

// Get current user action
export const getMe = createAsyncThunk(
  "auth/me",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
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
      localStorage.setItem("token", data.token);
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
      const data = await authService.register(payload);
      localStorage.setItem("token", data.token);
      return data.user;
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || "Registration failed"
      );
    }
  }
);
