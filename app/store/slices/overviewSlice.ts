import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { api } from '@/app/utils/axiosinstance'

// TypeScript interfaces for overview data
export interface TaskerOverview {
  totalBookings: number
  activeBookings: number
  earnings: number
  totalRequests: number
}

export interface ClientOverview {
  totals: {
    activeBookings: number
    earnings: number
    totalBookings: number
    totalRequests: number
  }
}

interface OverviewState {
  taskerOverview: TaskerOverview | null
  clientOverview: ClientOverview | null
  loading: boolean
  error: string | null
}

const initialState: OverviewState = {
  taskerOverview: null,
  clientOverview: null,
  loading: false,
  error: null,
}

// Async thunk for fetching tasker overview
export const fetchTaskerOverview = createAsyncThunk(
  'overview/fetchTaskerOverview',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/users/taskers/overview')
      
     
      return response.data as TaskerOverview
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message)
      }
      return rejectWithValue('Failed to fetch tasker overview')
    }
  }
)

// Async thunk for fetching client overview
export const fetchClientOverview = createAsyncThunk(
  'overview/fetchClientOverview',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/users/overview')
      
      return response.data as ClientOverview
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message)
      }
      return rejectWithValue('Failed to fetch client overview')
    }
  }
)

const overviewSlice = createSlice({
  name: 'overview',
  initialState,
  reducers: {
    clearOverview: (state) => {
      state.taskerOverview = null
      state.clientOverview = null
      state.error = null
    },
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchTaskerOverview pending state
      .addCase(fetchTaskerOverview.pending, (state) => {
        state.loading = true
        state.error = null
      })
      // Handle fetchTaskerOverview fulfilled state
      .addCase(fetchTaskerOverview.fulfilled, (state, action: PayloadAction<TaskerOverview>) => {
        state.loading = false
        state.taskerOverview = action.payload
        state.error = null
      })
      // Handle fetchTaskerOverview rejected state
      .addCase(fetchTaskerOverview.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
        state.taskerOverview = null
      })
      // Handle fetchClientOverview pending state
      .addCase(fetchClientOverview.pending, (state) => {
        state.loading = true
        state.error = null
      })
      // Handle fetchClientOverview fulfilled state
      .addCase(fetchClientOverview.fulfilled, (state, action: PayloadAction<ClientOverview>) => {
        state.loading = false
        state.clientOverview = action.payload
        state.error = null
      })
      // Handle fetchClientOverview rejected state
      .addCase(fetchClientOverview.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
        state.clientOverview = null
      })
  },
})

export const { clearOverview, clearError } = overviewSlice.actions

// Selectors
export const selectTaskerOverview = (state: RootState) => state.overview.taskerOverview
export const selectClientOverview = (state: RootState) => state.overview.clientOverview
export const selectOverviewLoading = (state: RootState) => state.overview.loading
export const selectOverviewError = (state: RootState) => state.overview.error

export default overviewSlice.reducer
