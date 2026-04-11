import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import { api } from "@/app/utils/axiosinstance"
import { Invitation, Request } from "@/app/types/types"

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

  outgoingInvitations: Request[]
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



// CREATE REQUEST
export const createRequest = createAsyncThunk(
  "request/create",
  async (data: Partial<Request>, { rejectWithValue }) => {
    try {
      const res = await api.post("/requests", data)
      console.log('create request response', res.data)
      return res.data
    } catch (err: any) {
      return rejectWithValue(err.response?.data)
    }
  }
)

// INVITE TASKER
export const inviteTasker = createAsyncThunk(
  "request/inviteTasker",
  async (
    { requestId, taskerId }: { requestId: string; taskerId: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await api.post(
        `/requests/${requestId}/invite-taskers/${taskerId}`
      )
      return res.data
    } catch (err: any) {
      return rejectWithValue(err.response?.data || "Something went wrong")
    }
  }
)

// FETCH OUTGOING
export const fetchOutgoingRequests = createAsyncThunk(
  "request/fetchOutgoing",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/requests/outgoing")
      return res.data
    } catch (err: any) {
      return rejectWithValue(err.response?.data)
    }
  }
)

// FETCH INCOMING
export const fetchIncomingRequests = createAsyncThunk(
  "request/fetchIncoming",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/requests/tasker/incoming")
      return res.data
    } catch (err: any) {
      return rejectWithValue(err.response?.data)
    }
  }
)

// ACCEPT
export const acceptRequest = createAsyncThunk(
  "request/accept",
  async (invitationId: string, { rejectWithValue }) => {
    try {
      const res = await api.post(
        `requests/tasker/invitations/${invitationId}/accept`
      )
      return res.data
    } catch (err: any) {
      return rejectWithValue(err.response?.data)
    }
  }
)

// REJECT
export const cancelRequest = createAsyncThunk(
  "request/reject",
  async (invitationId: string, { rejectWithValue }) => {
    try {
      const res = await api.post(
        `requests/tasker/invitations/${invitationId}/reject`
      )
      return res.data
    } catch (err: any) {
      return rejectWithValue(err.response?.data)
    }
  }
)

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
      state.loading.create = true
      state.error = null
    })
    builder.addCase(createRequest.fulfilled, (state, action) => {
      state.loading.create = false
      state.request = action.payload
    })
    builder.addCase(createRequest.rejected, (state, action) => {
      state.loading.create = false
      state.error =
        typeof action.payload === "string"
          ? action.payload
          : action.payload?.message || "Something went wrong"
    })

    // INVITE
    builder.addCase(inviteTasker.pending, (state) => {
      state.loading.invite = true
      state.error = null
    })
    builder.addCase(inviteTasker.fulfilled, (state, action) => {
      state.loading.invite = false
      state.outgoingInvitations.push(action.payload)
    })
    builder.addCase(inviteTasker.rejected, (state, action) => {
      state.loading.invite = false
      state.error =
        typeof action.payload === "string"
          ? action.payload
          : action.payload?.message || "Something went wrong"
    })

    // FETCH OUTGOING
    builder.addCase(fetchOutgoingRequests.pending, (state) => {
      state.loading.fetchOutgoing = true
      state.error = null
    })
    builder.addCase(fetchOutgoingRequests.fulfilled, (state, action) => {
      state.loading.fetchOutgoing = false
      state.outgoingInvitations = action.payload
    })
    builder.addCase(fetchOutgoingRequests.rejected, (state, action) => {
      state.loading.fetchOutgoing = false
      state.error =
        typeof action.payload === "string"
          ? action.payload
          : action.payload?.message || "Something went wrong"
    })

    // FETCH INCOMING
    builder.addCase(fetchIncomingRequests.pending, (state) => {
      state.loading.fetchIncoming = true
      state.error = null
    })
    builder.addCase(fetchIncomingRequests.fulfilled, (state, action) => {
      state.loading.fetchIncoming = false
      state.incomingInvitations = action.payload
    })
    builder.addCase(fetchIncomingRequests.rejected, (state, action) => {
      state.loading.fetchIncoming = false
      state.error =
        typeof action.payload === "string"
          ? action.payload
          : action.payload?.message || "Something went wrong"
    })

    // ACCEPT
    .addCase(acceptRequest.pending, (state, action) => {
  const id = action.meta.arg

  const inv = state.incomingInvitations.find(i => i.id === id)
  if (inv) {
    inv.status = "ACCEPTED"
  }
})
    builder.addCase(acceptRequest.fulfilled, (state, action) => {
      state.loading.accept = false
      const updated = action.payload
      state.incomingInvitations = state.incomingInvitations.map((inv) =>
        inv.id === updated.id ? updated : inv
      )
    })
    builder.addCase(acceptRequest.rejected, (state, action) => {
      state.loading.accept = false
      state.error =
        typeof action.payload === "string"
          ? action.payload
          : action.payload?.message || "Something went wrong"
    })

    // REJECT
  
    builder.addCase(cancelRequest.pending, (state, action) => {
  const id = action.meta.arg

  const inv = state.incomingInvitations.find(i => i.id === id)
  if (inv) {
    inv.status = "REJECTED"
  }
})

    builder.addCase(cancelRequest.fulfilled, (state, action) => {
      state.loading.reject = false
      const updated = action.payload
      state.incomingInvitations = state.incomingInvitations.map((inv) =>
        inv.id === updated.id ? updated : inv
      )
    })
    builder.addCase(cancelRequest.rejected, (state, action) => {
      state.loading.reject = false
      state.error =
        typeof action.payload === "string"
          ? action.payload
          : action.payload?.message || "Something went wrong"
    })
  },
})

export const { setSelectedRequestId, clearRequestError } =
  requestSlice.actions

export default requestSlice.reducer