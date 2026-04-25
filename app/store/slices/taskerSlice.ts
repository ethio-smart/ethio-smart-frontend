/* eslint-disable @typescript-eslint/no-explicit-any */
import { Tasker } from "@/app/types/types"
import { api } from "@/app/utils/axiosinstance"
import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
} from "@reduxjs/toolkit"



// export interface Tasker {
//   taskerId: string
//   name: string
//   image: string | null
//   bio: string
//   location: string
//   rating: number
//   isVerified: boolean
//   service: any
// }

interface TaskerState {
  // CREATE TASKER
  loading: boolean
  success: boolean
  error: string | null

  // FETCH TASKERS
  taskersByCategory: Record<string, Tasker[]>
  fetchLoading: boolean
  fetchError: string | null
  //
   tasker: Tasker | null
  singleFetchLoading: boolean
  singleFetchError: string | null
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

    tasker: null,
  singleFetchLoading: false,
  singleFetchError: null,
}

/*
   CREATE TASKER
 */

export const createTasker = createAsyncThunk(
  "tasker/createTasker",
  async (formData: any, { rejectWithValue }) => {
    try {
      const response = await api.post("/users/tasker", formData, {
       
      })
      return response.data
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create tasker",
      )
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
export const fetchTaskerById = createAsyncThunk(
  "tasker/fetchTaskerById",
  async (taskerId: string, { rejectWithValue }) => {
    console.log('⭐⭐⭐')
    try {
      const response = await api.get(
        `/users/taskers/${taskerId}`,
      )
      console.log('fetch tasker by id',response.data)

      return response.data
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch tasker",
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
      state.loading = false
      state.success = false
      state.error = null
    },

    clearTaskersByCategory: (
      state,
      action: PayloadAction<string>,
    ) => {
      delete state.taskersByCategory[action.payload]
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
            .addCase(fetchTaskerById.pending, (state) => {
        state.singleFetchLoading = true
        state.singleFetchError = null
      })
      .addCase(fetchTaskerById.fulfilled, (state, action: PayloadAction<Tasker>) => {
        state.singleFetchLoading = false
        state.tasker = action.payload
      })
      .addCase(fetchTaskerById.rejected, (state, action: any) => {
        state.singleFetchLoading = false
        state.singleFetchError = action.payload
      })
  },
})


export const {
  resetTaskerState,
  clearTaskersByCategory,
} = taskerSlice.actions

export default taskerSlice.reducer