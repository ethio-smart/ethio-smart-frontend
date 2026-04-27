/* eslint-disable @typescript-eslint/no-explicit-any */

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { api } from "@/app/utils/axiosinstance";
import { Booking } from "@/app/types/types";

interface BookingState {
  bookings: Booking[];
  //   selectedBooking: Booking | null
  loading: {
    fetchClient: boolean;
    fetchTasker: boolean;
  };
  error: string | null;
  success:boolean
}

const initialState: BookingState = {
  bookings: [],
  //   selectedBooking: null,
  loading: {
    fetchClient: false,
    fetchTasker: false,
  },
  error: null,
  success:false
};

// Fetch client bookings
export const fetchClientBookings = createAsyncThunk(
  "booking/fetchClientBookings",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/bookings/me");
      console.log("client booking", response);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data || err.message || "Failed to fetch bookings",
      );
    }
  },
);
// fetch tasker booking
export const fetchTaskerBookings = createAsyncThunk(
  "booking/fetchTaskerBooking",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("bookings/tasker/me");
      console.log("tasker bookings", res.data);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data || err.message || "Failed to fetch bookings",
      );
    }
  },
);
// reschedule booking
export const rescheduleBooking = createAsyncThunk(
  "booking/rescheduleBooking",
  async (
    { bookingId, preferedDate }: { bookingId: string; preferedDate: string },
    { rejectWithValue },
  ) => {
    try {
      const res = await api.patch(`/bookings/${bookingId}/reschedule`, {
        preferedDate,
      });
      console.log("reschedule response", res.data);

      return res.data;
    } catch (err: any) {
      console.log("err", err);
      return rejectWithValue(
        err.response?.data || err.message || "Failed to reschedule booking",
      );
    }
  },
);

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    // setSelectedBooking: (state, action: PayloadAction<Booking | null>) => {
    // //   state.selectedBooking = action.payload
    // },
    clearBookingError: (state) => {
      state.error = null;
    },
    clearBookings: (state) => {
      state.bookings = [];
      //   state.selectedBooking = null
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch client bookings
    builder
      .addCase(fetchClientBookings.pending, (state) => {
        state.loading.fetchClient = true;
        state.error = null;
      })
      .addCase(
        fetchClientBookings.fulfilled,
        (state, action: PayloadAction<Booking[]>) => {
          state.loading.fetchClient = false;
          state.bookings = action.payload;
        },
      )
      .addCase(fetchClientBookings.rejected, (state, action) => {
        state.loading.fetchClient = false;
        state.error = action.payload as string;
      })
      // fetch tasker bookings
      .addCase(fetchTaskerBookings.pending, (state) => {
        state.loading.fetchTasker = true;
        state.error = null;
      })
      .addCase(
        fetchTaskerBookings.fulfilled,
        (state, action: PayloadAction<Booking[]>) => {
          state.loading.fetchTasker = false;
          state.bookings = action.payload;
        },
      )
      .addCase(fetchTaskerBookings.rejected, (state, action) => {
        state.loading.fetchTasker = false;
        state.error = action.payload as string;
      })
      .addCase(rescheduleBooking.pending, (state) => {
        state.error = null;
      })
      .addCase(
        rescheduleBooking.fulfilled,
        (state, action: PayloadAction<Booking>) => {
          state.success=true
          const updatedBooking = action.payload;

          const index = state.bookings.findIndex(
            (b) => b.id === updatedBooking.id,
          );

          if (index !== -1) {
            state.bookings[index] = updatedBooking;
          }
        },
      )
      .addCase(rescheduleBooking.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const { clearBookingError, clearBookings } = bookingSlice.actions;
export default bookingSlice.reducer;
