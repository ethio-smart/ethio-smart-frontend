/* eslint-disable @typescript-eslint/no-explicit-any */

import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit"
import { User } from "@/app/types/types"
import { api } from "@/app/utils/axiosinstance"

// Async thunk to fetch the current logged-in user
export const fetchUser = createAsyncThunk<User>(
  "auth/fetchUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/users/me", {
      })
      // console.log('fetched user',response)
      return response.data 
    } catch (err: any) {
      return rejectWithValue(err.response?.data || err.message || "Failed to fetch user")
    }
  }
)

interface AuthState {
  user: User | null
  email: string | null
  loading: boolean
  error: string | null
}

const initialState: AuthState = {
  user: null,
  email: null,
  loading: false,
  error: null
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
    logout: (state) => {
      state.user = null
      state.email = null
      localStorage.removeItem("accessToken")
      state.loading = false
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload
        state.loading = false
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
        state.user = null
      })
  }
})

export const { setUser, setEmail, setLoading, setError, logout } = authSlice.actions
export default authSlice.reducer