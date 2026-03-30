/* eslint-disable @typescript-eslint/no-explicit-any */
import { Service } from '@/app/types/types';
import { api } from '@/app/utils/axiosinstance';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

type ServiceState = {
  services: Service[];
  currentService: Service | null;
  loading: boolean;
  creating: boolean;
  error: string | null;
};

const initialState: ServiceState = {
  services: [],
  currentService: null,
  loading: false,
  creating: false,
  error: null,
};

// console.log('initial service state', initialState);

/* 
   FETCH ALL SERVICES 
 */
export const fetchServices = createAsyncThunk(
  'service/fetchServices',
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get('/services');
      // console.log('fetchServices response:', res.data);

      return res.data.data; 
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to fetch services'
      );
    }
  }
);

/* 
   CREATE SERVICE
 */
export const createService = createAsyncThunk(
  'service/createService',
  async (data: Partial<Service>, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) throw new Error('No token found');

      const res = await api.post('/services', data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('createService response:', res.data);

      return res.data.data; 
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to create service'
      );
    }
  }
);

/* 
   FETCH  SERVICE BY USER ID
 */
export const fetchServicesByTaskerId = createAsyncThunk(
  'service/fetchServicesByTaskerId',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) throw new Error('No token found');

      const res = await api.get(`/services/tasker`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('fetchServicesByTaskerId response:', res.data);
      console.log('fetchServicesByTaskerId response:', res.data.data);
      
      return res.data; 
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to fetch service'
      );
    }
  }
);

/* 
   UPDATE SERVICE
 */
export const updateService = createAsyncThunk(
  'service/updateService',
  async (
    { id, data }: { id: string; data: Partial<Service> },
    { rejectWithValue }
  ) => {
    try {
      const res = await api.patch(`/services/${id}`, data);

      console.log('updateService response:', res.data);

      return res.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to update service'
      );
    }
  }
);

/* 
   DEACTIVATE SERVICE
 */
export const deactivateService = createAsyncThunk(
  'service/deactivateService',
  async (id: string, { rejectWithValue }) => {
    try {
      await api.patch(`/services/${id}/deactivate`, { active: false });
      return id;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to deactivate service'
      );
    }
  }
);

/* 
   SLICE
 */
const serviceSlice = createSlice({
  name: 'service',
  initialState,
  reducers: {
    clearServiceError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      /* FETCH SERVICES */
      .addCase(fetchServices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchServices.fulfilled,
        (state, action: PayloadAction<Service[]>) => {
          state.loading = false;
          state.services = action.payload; 
        }
      )
      .addCase(fetchServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      /* CREATE SERVICE */
      .addCase(createService.pending, (state) => {
        state.creating = true;
        state.error = null;
      })
      .addCase(
        createService.fulfilled,
        (state, action: PayloadAction<Service>) => {
          state.creating = false;
          state.services.unshift(action.payload);
        }
      )
      .addCase(createService.rejected, (state, action) => {
        state.creating = false;
        state.error = action.payload as string;
      })

      /* FETCH  SERVICE BY USERID */
      .addCase(fetchServicesByTaskerId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchServicesByTaskerId.fulfilled,
        (state, action: PayloadAction<Service>) => {
          state.loading = false;
          state.services = action.payload; 
        }
      )
      .addCase(fetchServicesByTaskerId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      /* UPDATE SERVICE */
      .addCase(
        updateService.fulfilled,
        (state, action: PayloadAction<Service>) => {
          const index = state.services.findIndex(
            (s) => s.id === action.payload.id
          );

          if (index !== -1) {
            state.services[index] = action.payload;
          }

          if (state.currentService?.id === action.payload.id) {
            state.currentService = action.payload;
          }
        }
      )

      /* DEACTIVATE SERVICE */
      .addCase(
        deactivateService.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.services = state.services.filter(
            (s) => s.id !== action.payload
          );
        }
      );
  },
});

export const { clearServiceError } = serviceSlice.actions;
export default serviceSlice.reducer;