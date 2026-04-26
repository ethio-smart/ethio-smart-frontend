/* eslint-disable @typescript-eslint/no-explicit-any */

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { api } from "@/app/utils/axiosinstance";
import { Booking } from "@/app/types/types";

interface BookingState {
  bookings: Booking[];
  adminBookings: Booking[];
  selectedAdminBooking: Booking | null;
  //   selectedBooking: Booking | null
  loading: {
    fetchClient: boolean;
    fetchTasker: boolean;
    fetchAdminList: boolean;
    fetchAdminDetails: boolean;
  };
  error: string | null;
  success: boolean;
}

const initialState: BookingState = {
  bookings: [],
  adminBookings: [],
  selectedAdminBooking: null,
  //   selectedBooking: null,
  loading: {
    fetchClient: false,
    fetchTasker: false,
    fetchAdminList: false,
    fetchAdminDetails: false,
  },
  error: null,
  success: false,
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

// fetch admin bookings list
export const fetchAdminBookings = createAsyncThunk(
  "booking/fetchAdminBookings",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/admin/bookings");
      const payload = res.data?.data ?? res.data;
      if (Array.isArray(payload)) return payload;
      return payload ? [payload] : [];
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data || err.message || "Failed to fetch admin bookings",
      );
    }
  },
);

// fetch admin booking details by id
export const fetchAdminBookingById = createAsyncThunk(
  "booking/fetchAdminBookingById",
  async (bookingId: string, { rejectWithValue }) => {
    try {
      const res = await api.get(`/admin/bookings/${bookingId}`);
      return res.data?.data ?? res.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data || err.message || "Failed to fetch booking details",
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
      state.adminBookings = [];
      state.selectedAdminBooking = null;
      //   state.selectedBooking = null
      state.error = null;
    },
    clearSelectedAdminBooking: (state) => {
      state.selectedAdminBooking = null;
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
      // fetch admin bookings list
      .addCase(fetchAdminBookings.pending, (state) => {
        state.loading.fetchAdminList = true;
        state.error = null;
      })
      .addCase(
        fetchAdminBookings.fulfilled,
        (state, action: PayloadAction<Booking[]>) => {
          state.loading.fetchAdminList = false;
          state.adminBookings = action.payload;
        },
      )
      .addCase(fetchAdminBookings.rejected, (state, action) => {
        state.loading.fetchAdminList = false;
        state.error = action.payload as string;
      })
      // fetch admin booking details
      .addCase(fetchAdminBookingById.pending, (state) => {
        state.loading.fetchAdminDetails = true;
        state.error = null;
      })
      .addCase(
        fetchAdminBookingById.fulfilled,
        (state, action: PayloadAction<Booking>) => {
          state.loading.fetchAdminDetails = false;
          state.selectedAdminBooking = action.payload;
        },
      )
      .addCase(fetchAdminBookingById.rejected, (state, action) => {
        state.loading.fetchAdminDetails = false;
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

export const { clearBookingError, clearBookings, clearSelectedAdminBooking } = bookingSlice.actions;
export default bookingSlice.reducer;
