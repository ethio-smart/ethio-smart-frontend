/* eslint-disable @typescript-eslint/no-explicit-any */

import { Notification, RegisterDeviceToken } from "@/app/types/types"
import { api } from "@/app/utils/axiosinstance"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"


interface DeviceTokenState {
  loading: boolean
  success: boolean
  errornotification: string | null

  deviceTokenApiResponse: any | null
  notificationResponse: any | null

  notifications: Notification[]
}

const initialState: DeviceTokenState = {
  loading: false,
  success: false,
  errornotification: null,
  deviceTokenApiResponse: null,
  notificationResponse: null,
  notifications: [],
}

/**
 * REGISTER DEVICE TOKEN
 */
export const registerDeviceToken = createAsyncThunk(
  "deviceToken/register",
  async (payload: RegisterDeviceToken, { rejectWithValue }) => {
    console.log('⭐ebakh wuta 😢😢😢😢😢')
    try {
      console.log('register device')
      const res = await api.post("/notifications/device-tokens", payload)
      console.log('res',res.data)
      return res.data
    } catch (err: any) {
      console.log('err',err)
      return rejectWithValue(err.response?.data || err.message)
    }
  }
)

/**
 * CREATE NOTIFICATION
 */
// export const createNotification = createAsyncThunk(
//   "notifications/create",
//   async (payload: Notification, { rejectWithValue }) => {
//     try {
//       const res = await api.post("/notifications", payload)
//       return res.data
//     } catch (err: any) {
//       return rejectWithValue(err.response?.data || err.message)
//     }
//   }
// )

/**
 * FETCH NOTIFICATIONS 
 */
export const fetchNotifications = createAsyncThunk(
  "notifications/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/notifications/me")
      return res.data
    } catch (err: any) {
      return rejectWithValue(err.response?.data || err.message)
    }
  }
)


const deviceTokenSlice = createSlice({
  name: "deviceToken",
  initialState,
  reducers: {
    resetDeviceTokenState: (state) => {
      state.loading = false
      state.success = false
      state.errornotification = null
      state.deviceTokenApiResponse = null
      state.notificationResponse = null
    },
  },

  extraReducers: (builder) => {
    /**
      REGISTER DEVICE TOKEN
     */
    builder
      .addCase(registerDeviceToken.pending, (state) => {
        state.loading = true
        state.success = false
        state.errornotification = null
      })
      .addCase(registerDeviceToken.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.deviceTokenApiResponse = action.payload
      })
      .addCase(registerDeviceToken.rejected, (state, action) => {
        state.loading = false
        state.success = false
        state.errornotification = (action.payload as string) || "Request failed"
      })

    /**
     * CREATE NOTIFICATION
     */
      // .addCase(createNotification.pending, (state) => {
      //   state.loading = true
      // })
      // .addCase(createNotification.fulfilled, (state, action) => {
      //   state.loading = false
      //   state.notificationResponse = action.payload
      // })
      // .addCase(createNotification.rejected, (state, action) => {
      //   state.loading = false
      //   state.errornotification = (action.payload as string) || "Request failed"
      // })

    /**
     * FETCH NOTIFICATIONS
     */
      .addCase(fetchNotifications.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.loading = false
        state.notifications = action.payload
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.loading = false
        state.error = (action.payload as string) || "Request failed"
      })
  },
})

export const { resetDeviceTokenState } = deviceTokenSlice.actions
export default deviceTokenSlice.reducer