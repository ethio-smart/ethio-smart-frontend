import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import { api } from "@/app/utils/axiosinstance"
import { Request } from "@/app/types/types"


// interface RequestState {
//   requests: Request
//   selectedRequestId: string | null
//   loading: boolean
//   error: string | null
// }

// const initialState: RequestState = {
//   requests: {},
//   selectedRequestId: null,
//   loading: false,
//   error: null,
// }
interface RequestState {
  request: Request | null
  selectedRequestId: string | null

  loading: {
    create: boolean
    invite: boolean
    fetchOutgoing: boolean
    fetchIncoming: boolean
    accept: boolean
    reject: boolean
  }

  outgoingInvitations: Invitation[]
  incomingInvitations: Invitation[]

  error: string | null
}

const initialState: RequestState = {
  request: null,
  selectedRequestId: null,
  loading: {
    create: false,
    invite: false,
    fetchOutgoing: false,
    fetchIncoming: false,
    accept: false,
    reject: false,
  },

  outgoingInvitations: [],
  incomingInvitations: [],

  error: null,
}


//1. CREATE REQUEST
export const createRequest = createAsyncThunk(
  "request/create",
  async (data: Partial<Request>, { rejectWithValue }) => {
          const token = localStorage.getItem("accessToken") 
    try {
      const res = await api.post("/requests", data)
      console.log('create request response', res.data)
      return res.data
    } catch (err: any) {
      return rejectWithValue(err.response?.data)
    }
  }
)

//2.INVITE TASKER TO REQUEST
export const inviteTasker = createAsyncThunk(
  "request/inviteTasker",
  async ({ requestId, taskerId }: { requestId: string; taskerId: string }, { rejectWithValue }) => {  
    const token = localStorage.getItem("accessToken")
    try {
      console.log('invite tasker✨✨📯')
      const res = await api.post(
        // requests/23456709/invite-taskers/987456789
        `/requests/${requestId}/invite-taskers/${taskerId}`
      )
      return res.data
    }
      catch (err: any) {
      return rejectWithValue(err.response?.data)
    }
  }
)

// 3.FETCH OUTGOING REQUESTS-CLIENT
export const fetchOutgoingRequests = createAsyncThunk(
  "request/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/requests/outgoing ")
      return res.data
    } catch (err: any) {
      return rejectWithValue(err.response?.data)
    }
  }
)

//4. FETCH INCOMING REQUEST-TASKER
export const fetchIncomingRequests = createAsyncThunk(
  "request/fetchById",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get(`/requests/incoming`)
      return res.data
    } catch (err: any) {
      return rejectWithValue(err.response?.data)
    }
  }
)



// DELETE
// export const deleteRequest = createAsyncThunk(
//   "request/delete",
//   async (id: string, { rejectWithValue }) => {
//     try {
//       await api.delete(`/requests/${id}`)
//       return id
//     } catch (err: any) {
//       return rejectWithValue(err.response?.data)
//     }
//   }
// )

// ================= SLICE =================

const requestSlice = createSlice({
  name: "request",
  initialState,
  reducers: {
    setSelectedRequestId(state, action: PayloadAction<string | null>) {
      state.selectedRequestId = action.payload
    },

    clearRequestError(state) {
      state.error = null
    },
  },

  extraReducers: (builder) => {
    // CREATE
    builder.addCase(createRequest.pending, (state) => {
      state.loading = true
      state.error = null
    })
    builder.addCase(createRequest.fulfilled, (state, action) => {
      state.loading = false
      state.request = action.payload
    })
    builder.addCase(createRequest.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload as string
    })
    //INVITE-TASKER
    builder.addCase(inviteTasker.pending, (state) => {
      state.loading = true
      state.error = null
    })
    builder.addCase(inviteTasker.fulfilled, (state) => {
      state.loading = false
    })
    builder.addCase(inviteTasker.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload as string
    })

    // FETCH ALL
    // builder.addCase(fetchRequests.pending, (state) => {
    //   state.loading = true
    // })
    // builder.addCase(fetchRequests.fulfilled, (state, action) => {
    //   state.loading = false
    //   state.requests = action.payload
    // })
    // builder.addCase(fetchRequests.rejected, (state, action) => {
    //   state.loading = false
    //   state.error = action.payload as string
    // })

    // // FETCH BY ID (optional usage)
    // builder.addCase(fetchRequestById.fulfilled, (state, action) => {
    //   const exists = state.requests.find(r => r.id === action.payload.id)

    //   if (!exists) {
    //     state.requests.push(action.payload)
    //   }

    //   state.selectedRequestId = action.payload.id
    // })

    // // UPDATE
    // builder.addCase(updateRequest.fulfilled, (state, action) => {
    //   const index = state.requests.findIndex(
    //     r => r.id === action.payload.id
    //   )

    //   if (index !== -1) {
    //     state.requests[index] = action.payload
    //   }
    // })

    // // DELETE
    // builder.addCase(deleteRequest.fulfilled, (state, action) => {
    //   state.requests = state.requests.filter(
    //     r => r.id !== action.payload
    //   )
    // })
  },
})

export const { setSelectedRequestId, clearRequestError } =
  requestSlice.actions

export default requestSlice.reducer