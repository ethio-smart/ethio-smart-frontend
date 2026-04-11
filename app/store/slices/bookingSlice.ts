import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import { api } from "@/app/utils/axiosinstance"
import { Booking } from "@/app/types/types"

interface BookingState {
  bookings: Booking[]
//   selectedBooking: Booking | null
  loading: {
    fetch: boolean
  }
  error: string | null
}

const initialState: BookingState = {
  bookings: [],
//   selectedBooking: null,
  loading: {
    fetch: false,
  },
  error: null,
}

// Fetch client bookings
export const fetchClientBookings = createAsyncThunk(
  "booking/fetchClientBookings",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/bookings/me")
      console.log('client booking',response)
      return response.data
    } catch (err: any) {
      return rejectWithValue(err.response?.data || err.message || "Failed to fetch bookings")
    }
  }
)

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    // setSelectedBooking: (state, action: PayloadAction<Booking | null>) => {
    // //   state.selectedBooking = action.payload
    // },
    clearBookingError: (state) => {
      state.error = null
    },
    clearBookings: (state) => {
      state.bookings = []
    //   state.selectedBooking = null
      state.error = null
    },
  },
  extraReducers: (builder) => {
    // Fetch client bookings
    builder
      .addCase(fetchClientBookings.pending, (state) => {
        state.loading.fetch = true
        state.error = null
      })
      .addCase(fetchClientBookings.fulfilled, (state, action: PayloadAction<Booking[]>) => {
        state.loading.fetch = false
        state.bookings = action.payload
      })
      .addCase(fetchClientBookings.rejected, (state, action) => {
        state.loading.fetch = false
        state.error = action.payload as string
      })
  },
})

export const { clearBookingError, clearBookings } = bookingSlice.actions
export default bookingSlice.reducer