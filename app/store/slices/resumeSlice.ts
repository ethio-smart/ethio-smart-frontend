/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "@/app/utils/axiosinstance"
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"


export interface Resume {
  Name: string
  Phone: string
  Location: string
  Summary: string
  Experience: {
    title: string
      company: string; 
    location: string
    date: string
    description: string
  }[]
  Certifications: string[]
  Services: string[]
  Languages: string[]
  Rating: string
  "Users Served": number
  Availability: string
  Education: string
}

interface ResumeState {
  data: Resume | null
  loading: boolean
  error: string | null
}



const initialState: ResumeState = {
  data: null,
  loading: false,
  error: null,
}


export const fetchResume = createAsyncThunk<
  { resume: Resume },   
  string,               
  { rejectValue: string }
>(
  "resume/fetchResume",
  async (taskerId, { rejectWithValue }) => {
    try {
      const res = await api.get(
        `/ai/resume/tasker/${taskerId}`
      )

      return res.data
    } catch (err: any) {
      return rejectWithValue(
        err?.response?.data?.message || "Failed to fetch resume"
      )
    }
  }
)
export const fetchResumeTasker= createAsyncThunk<
  { resume: Resume },
  void,
  { rejectValue: string }
>(
  "resume/fetchResumeTasker",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get(
        `/ai/resume/me`
      )

      return res.data
    } catch (err: any) {
      return rejectWithValue(
        err?.response?.data?.message || "Failed to fetch resume"
      )
    }
  }
)



const resumeSlice = createSlice({
  name: "resume",
  initialState,
  reducers: {

    clearResume: (state) => {
      state.data = null
      state.error = null
      state.loading = false
    },
  },
  extraReducers: (builder) => {
    builder

      // PENDING
      .addCase(fetchResume.pending, (state) => {
        state.loading = true
        state.error = null
      })

      // SUCCESS
      .addCase(
        fetchResume.fulfilled,
        (state, action: PayloadAction<{ resume: Resume }>) => {
          state.loading = false
          state.data = action.payload.resume
        }
      )

      // ERROR
      .addCase(fetchResume.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || "Something went wrong"
      })
      .addCase(fetchResumeTasker.pending, (state) => {
        state.loading = true
        state.error = null
      })

      // SUCCESS
      .addCase(
        fetchResumeTasker.fulfilled,
        (state, action: PayloadAction<{ resume: Resume }>) => {
          state.loading = false
          state.data = action.payload.resume
        }
      )

      // ERROR
      .addCase(fetchResumeTasker.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || "Something went wrong"
      })
  },
})



export const { clearResume } = resumeSlice.actions

export default resumeSlice.reducer