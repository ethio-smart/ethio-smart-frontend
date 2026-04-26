/* eslint-disable @typescript-eslint/no-explicit-any */

import { api } from "@/app/utils/axiosinstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface ReviewState {
  loading: boolean;
  success: boolean;
  error: string | null;
  reviews: any[];
  rating: {
    average: number;
    totalReviews: number;
  };
}

const initialState: ReviewState = {
  loading: false,
  success: false,
  error: null,
  reviews:[],
  rating: {
    average: 0,
    totalReviews: 0,
  },
};

export const createReview = createAsyncThunk(
  "review/create",
  async (
    {
      bookingId,
      rating,
      comment,
    }: {
      bookingId: string;
      rating: number;
      comment: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.post(
        `/bookings/${bookingId}/review`,
        {
          rating,
          comment,
        }
      );
      console.log('review and rating response',response.data)

      return response.data;
    } catch (error: any) {
      console.log('error',error)
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);

//get tasker review
export const getTaskerReviews = createAsyncThunk(
  "review/getTaskerReviews",
  async (taskerId: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`/bookings/tasker/${taskerId}/reviews`);
      console.log(response.data)
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch reviews"
      );
    }
  }
);


const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {
    resetReviewState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createReview.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(createReview.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(createReview.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload as string;
      })
       .addCase(getTaskerReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTaskerReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload.reviews || [];
        state.rating = action.payload.rating || { average: 0, totalReviews: 0 };
      })
      .addCase(getTaskerReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetReviewState } = reviewSlice.actions;
export default reviewSlice.reducer;