/* eslint-disable @typescript-eslint/no-explicit-any */


import { TaskCompletion } from "@/app/types/types";
import { api } from "@/app/utils/axiosinstance";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface TaskCompletionState {
  tasks: TaskCompletion[];
  loading: {
    create: boolean;
    update:{
        decline:boolean,
        confirm:boolean,
    }
    fetch: boolean;
  };
  success: boolean;
  error: string | null;
}

const initialState: TaskCompletionState = {
  tasks: [],
  loading: {
    create: false,
    update: {
        confirm:false,
        decline:false
    },
    fetch: false,
  },
  success: false,
  error: null,
};


//  CREATE
export const createTaskCompletion = createAsyncThunk(
  "taskCompletion/create",
  async (data: TaskCompletion, { rejectWithValue }) => {
    try {
      const res = await api.post("/task-completions", data);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Something went wrong"
      );
    }
  }
);


//  FETCH 
export const fetchTaskCompletion = createAsyncThunk(
  "taskCompletion/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/task-completions/me");
      return res.data; // expected: TaskCompletion[]
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);


//  UPDATE STATUS (ACCEPT / DECLINE)
export const updateTaskCompletionStatus = createAsyncThunk(
  "taskCompletion/updateStatus",
  async (
    {
      id,
      status,
    }: { id: string; status: "ACCEPTED" | "DECLINED" },
    { rejectWithValue }
  ) => {
    try {
      const res = await api.patch(
        `/task-completions/${id}/status`,
        { status }
      );
      console.log('res of confirm',res.data)
      return res.data; 
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to update status"
      );
    }
  }
);


const taskCompletionSlice = createSlice({
  name: "taskCompletion",
  initialState,
  reducers: {
    resetTaskCompletionState: (state) => {
      state.loading.create = false;
      state.loading.update.confirm = false;
      state.loading.update.decline = false;
      state.loading.fetch = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder

      // 🔹 CREATE
      .addCase(createTaskCompletion.pending, (state) => {
        state.loading.create = true;
        state.error = null;
      })
      .addCase(createTaskCompletion.fulfilled, (state, action) => {
        state.loading.create = false;
        state.success = true;

        // optional: push into list
        state.tasks.unshift(action.payload);
      })
      .addCase(createTaskCompletion.rejected, (state, action) => {
        state.loading.create = false;
        state.error = action.payload as string;
      })


      // 🔹 FETCH
      .addCase(fetchTaskCompletion.pending, (state) => {
        state.loading.fetch = true;
        state.error = null;
      })
      .addCase(fetchTaskCompletion.fulfilled, (state, action) => {
        state.loading.fetch = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTaskCompletion.rejected, (state, action) => {
        state.loading.fetch = false;
        state.error = action.payload as string;
      })


      // 🔹 UPDATE STATUS
      .addCase(updateTaskCompletionStatus.pending, (state) => {
        state.loading.update.confirm = true;
        state.loading.update.decline = true;
        state.error = null;
      })
      .addCase(updateTaskCompletionStatus.fulfilled, (state, action) => {
        state.loading.update.decline= false;
        state.loading.update.confirm= false;

        const index = state.tasks.findIndex(
          (t) => t.id === action.payload.id
        );

        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
      .addCase(updateTaskCompletionStatus.rejected, (state, action) => {
        state.loading.update.confirm = false;
        state.loading.update.decline = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetTaskCompletionState } = taskCompletionSlice.actions;

export default taskCompletionSlice.reducer;