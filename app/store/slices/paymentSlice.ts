/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '@/app/utils/axiosinstance'
import { PaymentResponse, PaymentState,Payment } from '@/app/types/types'

const initialState: PaymentState = {
  paymentResponse: null,
    paymentHistory: [] as Payment[],
  loading: {
    createPayment: false
    ,paymentHistory:false
  },
  error: null
}

export const createPayment = createAsyncThunk<PaymentResponse, string>(
  'payment/createPayment',
  async (bookingId, { rejectWithValue }) => {
    console.log('payment')
    try {
      const response = await api.post(`/bookings/${bookingId}/pay`)
      console.log('payment response', response.data)
      return response.data
    } catch (err: any) {
      return rejectWithValue(err.response?.data || err.message || "Failed to create payment")
    }
  }
)
// fetch payment history
export const fetchPaymentHistory=createAsyncThunk(
  'payment/fetchPaymentHistory',
  async (_, {rejectWithValue})=>{
    try {
      const response=await api.get('/payments/me/history')
      return response.data
    } catch (err:any) {
      return rejectWithValue(err.response?.data || err.message || "Failed to fetch payment history")
    }
  }
)

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    clearPaymentResponse: (state) => {
      state.paymentResponse = null
    },
    clearError: (state) => {
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      // Create Payment
      .addCase(createPayment.pending, (state) => {
        state.loading.createPayment = true
        state.error = null
      })
      .addCase(createPayment.fulfilled, (state, action) => {
        state.loading.createPayment = false
        state.paymentResponse = action.payload
        state.error = null
      })
      .addCase(createPayment.rejected, (state, action) => {
        state.loading.createPayment = false
        state.error = action.payload as string
      })
      // Fetch Payment History
      .addCase(fetchPaymentHistory.pending, (state) => {
        state.loading.paymentHistory = true
        state.error = null})
      .addCase(fetchPaymentHistory.fulfilled, (state, action) => {
        state.paymentHistory = action.payload
        state.error = null
      })
      .addCase(fetchPaymentHistory.rejected, (state, action) => {
        state.error = action.payload as string
      })
  }
})

export const { clearPaymentResponse, clearError } = paymentSlice.actions
export default paymentSlice.reducer