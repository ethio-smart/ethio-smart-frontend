/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "@/app/utils/axiosinstance";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface TaskerState {
  loading: boolean;
  success: boolean;
  error: string | null;
}

const initialState: TaskerState = {
  loading: false,
  success: false,
  error: null,
};

export const createTasker = createAsyncThunk(
  "tasker/createTasker",
  async (formData: any, { rejectWithValue }) => {
    console.log("form data🙄🙄🙄", formData);
    try {
      const token = localStorage.getItem("accessToken");
      console.log("access-token0000", token);
      const response = await api.post("/users/tasker", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log("response to create tasker", response);
      return response.data;
    } catch (error: any) {
      console.log("error💥💥", error);
      return rejectWithValue(
        error.response?.data?.message || "Failed to create tasker",
      );
    }
  },
);

const taskerSlice = createSlice({
  name: "tasker",
  initialState,
  reducers: {
    resetTaskerState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(createTasker.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(createTasker.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })

      .addCase(createTasker.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetTaskerState } = taskerSlice.actions;
export default taskerSlice.reducer;
