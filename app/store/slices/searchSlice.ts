/* eslint-disable @typescript-eslint/no-explicit-any */

import { api } from "@/app/utils/axiosinstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface SearchState {
  results: any[];
  loading: boolean;
  error: string | null;
}

const initialState: SearchState = {
  results: [],
  loading: false,
  error: null,
};

// create
export const searchTaskers = createAsyncThunk(
  "search/taskers",
  async (payload: {
    query: string;
    originalLanguage: string;
  }, { rejectWithValue }) => {
    // console.log('payload',payload);
    try {
   
      const response = await api.post("/ai/search-taskers", payload);
      console.log('semantic search response',response.data)
      return response.data;
    } catch (error: any) {
      // console.log('💥💥💥💥💥💥',error)
      return rejectWithValue(
        error.response?.data || "Something went wrong"
      );
    }
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    clearResults: (state) => {
      state.results = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchTaskers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchTaskers.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload;
      })
      .addCase(searchTaskers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearResults } = searchSlice.actions;
export default searchSlice.reducer;