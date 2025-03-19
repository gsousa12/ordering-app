import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../../_shared/axios/axiosInstance";

interface AuthState {
  user: any;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  refreshToken: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  refreshToken: localStorage.getItem("refresh_token"),
};

export const loginUser = createAsyncThunk(
  "auth/login",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await api.post("/auth/login", { email, password });

      console.log(data);

      localStorage.setItem("refresh_token", data.data.refresh_token);

      return {
        user: data.data.user,
        refreshToken: data.data.refresh_token,
      };
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Erro ao fazer login"
      );
    }
  }
);

export const logoutUser = createAsyncThunk("auth/logout", async () => {
  await api.post("/auth/logout");
  localStorage.removeItem("refresh_token");
  return null;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.refreshToken = action.payload.refreshToken;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.refreshToken = null;
        state.isAuthenticated = false;
      });
  },
});

export default authSlice.reducer;
