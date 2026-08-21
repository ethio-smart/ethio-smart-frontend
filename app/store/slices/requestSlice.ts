/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import { api } from "@/app/utils/axiosinstance"
import {  Invitation, Request, ServiceRequestFrom } from "@/app/types/types"

interface RequestState {
  request: Request | null
  selectedRequestId: string | null
serviceRequestFrom: ServiceRequestFrom | null
  loading: {
    create: boolean
    invite: boolean
    fetchOutgoing: boolean
    fetchIncoming: boolean
    createFromService: boolean
    accept: boolean
    reject: boolean
    cancel: boolean
  }

  outgoingInvitations: Request[]
  incomingInvitations: Invitation[]

  error: string | null
}

const initialState: RequestState = {
  request: null,
  selectedRequestId: null,
  serviceRequestFrom:  null,
  loading: {
    create: false,
    invite: false,
    fetchOutgoing: false,
    fetchIncoming: false,
    createFromService:false,
    accept: false,
    reject: false,
    cancel: false,
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
      return rejectWithValue({
        status: err.response?.status,
        message: err.response?.data?.message || err.message,
        data: err.response?.data
      })
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
export const rejectRequest = createAsyncThunk(
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
//cancel request
export const cancelRequest = createAsyncThunk(
  "request/cancel",
  async (requestId: string, { rejectWithValue }) => {
    try {
      const res = await api.patch(
        `requests/${requestId}/cancel`
      )
      console.log('cancel request response',res.data)
      return res.data
    } catch (err: any) {
      return rejectWithValue(err.response?.data)
    }
  }
)
//request from service
export const createRequestFromService = createAsyncThunk( 
  "request/createFromService",
  async (
    data: ServiceRequestFrom,
    { rejectWithValue }
  ) => {
    try {
      console.log('--------------------------')
      const res = await api.post(
        `requests/from-service/${data.serviceId}`,
      data
      )
      console.log('service request from 🐰🐰🐰',res.data)

      return res.data
    } catch (err: any) {
      return rejectWithValue(err.response?.data || "Failed to create request from service")
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
          : (action.payload as any)?.message || "Something went wrong"
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
          : (action.payload as any)?.message || "Something went wrong"
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
          : (action.payload as any)?.message || "Something went wrong"
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
          : (action.payload as any)?.message || "Something went wrong"
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
          : (action.payload as any)?.message || "Something went wrong"
    })

    // REJECT
  
    builder.addCase(rejectRequest.pending, (state, action) => {
  const id = action.meta.arg

  const inv = state.incomingInvitations.find(i => i.id === id)
  if (inv) {
    inv.status = "REJECTED"
  }
})

    builder.addCase(rejectRequest.fulfilled, (state, action) => {
      state.loading.reject = false
      const updated = action.payload
      state.incomingInvitations = state.incomingInvitations.map((inv) =>
        inv.id === updated.id ? updated : inv
      )
    })
    builder.addCase(rejectRequest.rejected, (state, action) => {
      state.loading.reject = false
      state.error =
        typeof action.payload === "string"
          ? action.payload
          : (action.payload as any)?.message || "Something went wrong"
    })
    // CANCEL
    builder.addCase(cancelRequest.pending, (state, action) => {
      const id = action.meta.arg 
      const req = state.outgoingInvitations.find(r => r.id === id)
      if(req){
        req.status = "CANCELLED" as any
      }
    })
    builder.addCase(cancelRequest.fulfilled, (state, action) => {
      state.loading.cancel = false
      const updated = action.payload
      state.outgoingInvitations = state.outgoingInvitations.map((req) =>
        req.id === updated.id ? updated : req
      )
    })
    builder.addCase(cancelRequest.rejected, (state, action) => {
      state.loading.cancel = false
      state.error =
        typeof action.payload === "string"
          ? action.payload
          : (action.payload as any)?.message || "Something went wrong"
    }
    
    )
    // CREATE FROM SERVICE
builder.addCase(createRequestFromService.pending, (state) => {
  state.loading.createFromService = true
  state.error = null
})

builder.addCase(createRequestFromService.fulfilled, (state, action) => {
  state.loading.createFromService = false
  state.serviceRequestFrom = action.payload
})

builder.addCase(createRequestFromService.rejected, (state, action) => {
  state.loading.createFromService = false
  state.error =
    typeof action.payload === "string"
      ? action.payload
      : (action.payload as any)?.message || "Something went wrong"
})
  },
})

export const { setSelectedRequestId, clearRequestError } =
  requestSlice.actions

export default requestSlice.reducer