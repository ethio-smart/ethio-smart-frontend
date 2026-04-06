/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "@/app/utils/axiosinstance";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface TaskerState {
  // CREATE TASKER
  loading: boolean
  success: boolean
  error: string | null

  // FETCH TASKERS
  taskersByCategory: Record<string, Tasker[]>
  fetchLoading: boolean
  fetchError: string | null
}

/*
   INITIAL STATE
 */

const initialState: TaskerState = {
  loading: false,
  success: false,
  error: null,

  taskersByCategory: {},
  fetchLoading: false,
  fetchError: null,
}

/*
   CREATE TASKER
 */

export const createTasker = createAsyncThunk(
  "tasker/createTasker",
  async (formData: any, { rejectWithValue }) => {
    console.log("form data🙄🙄🙄", formData);
    try {
      

      const response = await api.post("/users/tasker", formData, {
       
      })

      return response.data
    } catch (error: any) {
      console.log("error💥💥", error);
      return rejectWithValue(
        error.response?.data?.message || "Failed to create tasker",
      );
    }
  },
)
   
//FETCH TASKERS BY CATEGORY
export const fetchTaskersByCategory = createAsyncThunk(
  "tasker/fetchTaskersByCategory",
  async (categoryId: string, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `/users/taskers/category/${categoryId}`,
      )
      console.log('fetch tasker by category response',response)

      return {
        categoryId,
        data: response.data,
      }
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch taskers",
      )
    }
  },
)

/*
   SLICE
 */

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

      /*
         CREATE TASKER
      */
      .addCase(createTasker.pending, (state) => {
        state.loading = true
        state.error = null
        state.success = false
      })
      .addCase(createTasker.fulfilled, (state) => {
        state.loading = false
        state.success = true
      })
      .addCase(createTasker.rejected, (state, action: any) => {
        state.loading = false
        state.error = action.payload
      })

      /*
         FETCH TASKERS
      */
      .addCase(fetchTaskersByCategory.pending, (state) => {
        state.fetchLoading = true
        state.fetchError = null
      })
      .addCase(
        fetchTaskersByCategory.fulfilled,
        (state, action: PayloadAction<any>) => {
          const { categoryId, data } = action.payload

          state.taskersByCategory[categoryId] = data
          state.fetchLoading = false
        },
      )
      .addCase(
        fetchTaskersByCategory.rejected,
        (state, action: any) => {
          state.fetchLoading = false
          state.fetchError = action.payload
        },
      )
  },
})


export const {
  resetTaskerState,
  clearTaskersByCategory,
} = taskerSlice.actions

export default taskerSlice.reducer