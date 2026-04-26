/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import type {
  AdminAnalyticsOverview,
  AdminAnalyticsPeriodSnapshot,
  AdminAnalyticsSeriesResponse,
} from "@/app/types/types";
import { api } from "@/app/utils/axiosinstance";

type AdminAnalyticsState = {
  overview: AdminAnalyticsOverview | null;
  weekly: AdminAnalyticsPeriodSnapshot | null;
  monthly: AdminAnalyticsPeriodSnapshot | null;
  weeklySeries: AdminAnalyticsSeriesResponse | null;
  monthlySeries: AdminAnalyticsSeriesResponse | null;
  loadingOverview: boolean;
  loadingWeekly: boolean;
  loadingMonthly: boolean;
  loadingWeeklySeries: boolean;
  loadingMonthlySeries: boolean;
  error: string | null;
};

const toNumber = (value: unknown) => {
  const numeric = Number(value ?? 0);
  return Number.isFinite(numeric) ? numeric : 0;
};

const normalizeSeriesItem = (item: any): AdminAnalyticsSeriesResponse["data"][number] => ({
  label: String(item?.label ?? item?.periodLabel ?? item?.name ?? "N/A"),
  periodStart: String(item?.periodStart ?? item?.startDate ?? ""),
  periodEnd: String(item?.periodEnd ?? item?.endDate ?? ""),
  totalBookings: toNumber(item?.totalBookings ?? item?.bookings),
  activeBookings: toNumber(item?.activeBookings ?? item?.inProgressBookings),
  earnings: toNumber(item?.earnings ?? item?.totalEarnings ?? item?.revenue),
  totalRequests: toNumber(item?.totalRequests ?? item?.requests),
  totalTaskers: toNumber(item?.totalTaskers ?? item?.taskers),
});

const normalizeSeriesPayload = (payload: unknown): AdminAnalyticsSeriesResponse => {
  if (Array.isArray(payload)) {
    return { data: payload.map(normalizeSeriesItem) };
  }

  if (payload && typeof payload === "object") {
    const typedPayload = payload as Record<string, unknown>;
    const rawSeries =
      typedPayload.data ??
      typedPayload.series ??
      typedPayload.result ??
      typedPayload.items;

    if (Array.isArray(rawSeries)) {
      return {
        weeks: typedPayload.weeks ? toNumber(typedPayload.weeks) : undefined,
        months: typedPayload.months ? toNumber(typedPayload.months) : undefined,
        data: rawSeries.map(normalizeSeriesItem),
      };
    }
  }

  return { data: [] };
};

const normalizeOverviewPayload = (payload: unknown): AdminAnalyticsOverview => {
  const rawTotals = (payload as any)?.totals ?? payload ?? {};
  return {
    totals: {
      totalBookings: toNumber(rawTotals?.totalBookings),
      activeBookings: toNumber(rawTotals?.activeBookings),
      earnings: toNumber(rawTotals?.earnings),
      totalRequests: toNumber(rawTotals?.totalRequests),
      totalTaskers: toNumber(rawTotals?.totalTaskers),
      approvedTaskers: toNumber(rawTotals?.approvedTaskers),
    },
  };
};

const normalizeSnapshotPayload = (payload: unknown): AdminAnalyticsPeriodSnapshot => {
  const raw = (payload as any) ?? {};
  return {
    periodStart: String(raw?.periodStart ?? ""),
    periodEnd: String(raw?.periodEnd ?? ""),
    totalBookings: toNumber(raw?.totalBookings),
    activeBookings: toNumber(raw?.activeBookings),
    earnings: toNumber(raw?.earnings),
    totalRequests: toNumber(raw?.totalRequests),
    totalTaskers: toNumber(raw?.totalTaskers),
  };
};

const initialState: AdminAnalyticsState = {
  overview: null,
  weekly: null,
  monthly: null,
  weeklySeries: null,
  monthlySeries: null,
  loadingOverview: false,
  loadingWeekly: false,
  loadingMonthly: false,
  loadingWeeklySeries: false,
  loadingMonthlySeries: false,
  error: null,
};

const getErrorMessage = (error: any, fallback: string) =>
  error?.response?.data?.message || fallback;

export const fetchAdminAnalyticsOverview = createAsyncThunk(
  "adminAnalytics/fetchOverview",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/admin/analytics/overview");
      return normalizeOverviewPayload(response.data?.data ?? response.data);
    } catch (error: any) {
      return rejectWithValue(
        getErrorMessage(error, "Failed to fetch analytics overview"),
      );
    }
  },
);

export const fetchAdminAnalyticsWeekly = createAsyncThunk(
  "adminAnalytics/fetchWeekly",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/admin/analytics/weekly");
      return normalizeSnapshotPayload(response.data?.data ?? response.data);
    } catch (error: any) {
      return rejectWithValue(
        getErrorMessage(error, "Failed to fetch weekly analytics"),
      );
    }
  },
);

export const fetchAdminAnalyticsMonthly = createAsyncThunk(
  "adminAnalytics/fetchMonthly",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/admin/analytics/monthly");
      return normalizeSnapshotPayload(response.data?.data ?? response.data);
    } catch (error: any) {
      return rejectWithValue(
        getErrorMessage(error, "Failed to fetch monthly analytics"),
      );
    }
  },
);

export const fetchAdminAnalyticsWeeklySeries = createAsyncThunk(
  "adminAnalytics/fetchWeeklySeries",
  async (weeks: number, { rejectWithValue }) => {
    try {
      const response = await api.get("/admin/analytics/weekly/series", {
        params: { weeks },
      });
      return normalizeSeriesPayload(response.data?.data ?? response.data);
    } catch (error: any) {
      return rejectWithValue(
        getErrorMessage(error, "Failed to fetch weekly analytics series"),
      );
    }
  },
);

export const fetchAdminAnalyticsMonthlySeries = createAsyncThunk(
  "adminAnalytics/fetchMonthlySeries",
  async (months: number, { rejectWithValue }) => {
    try {
      const response = await api.get("/admin/analytics/monthly/series", {
        params: { months },
      });
      return normalizeSeriesPayload(response.data?.data ?? response.data);
    } catch (error: any) {
      return rejectWithValue(
        getErrorMessage(error, "Failed to fetch monthly analytics series"),
      );
    }
  },
);

const adminAnalyticsSlice = createSlice({
  name: "adminAnalytics",
  initialState,
  reducers: {
    clearAdminAnalyticsError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminAnalyticsOverview.pending, (state) => {
        state.loadingOverview = true;
        state.error = null;
      })
      .addCase(fetchAdminAnalyticsOverview.fulfilled, (state, action) => {
        state.loadingOverview = false;
        state.overview = action.payload;
      })
      .addCase(fetchAdminAnalyticsOverview.rejected, (state, action) => {
        state.loadingOverview = false;
        state.error = action.payload as string;
      })
      .addCase(fetchAdminAnalyticsWeekly.pending, (state) => {
        state.loadingWeekly = true;
        state.error = null;
      })
      .addCase(fetchAdminAnalyticsWeekly.fulfilled, (state, action) => {
        state.loadingWeekly = false;
        state.weekly = action.payload;
      })
      .addCase(fetchAdminAnalyticsWeekly.rejected, (state, action) => {
        state.loadingWeekly = false;
        state.error = action.payload as string;
      })
      .addCase(fetchAdminAnalyticsMonthly.pending, (state) => {
        state.loadingMonthly = true;
        state.error = null;
      })
      .addCase(fetchAdminAnalyticsMonthly.fulfilled, (state, action) => {
        state.loadingMonthly = false;
        state.monthly = action.payload;
      })
      .addCase(fetchAdminAnalyticsMonthly.rejected, (state, action) => {
        state.loadingMonthly = false;
        state.error = action.payload as string;
      })
      .addCase(fetchAdminAnalyticsWeeklySeries.pending, (state) => {
        state.loadingWeeklySeries = true;
        state.error = null;
      })
      .addCase(fetchAdminAnalyticsWeeklySeries.fulfilled, (state, action) => {
        state.loadingWeeklySeries = false;
        state.weeklySeries = action.payload;
      })
      .addCase(fetchAdminAnalyticsWeeklySeries.rejected, (state, action) => {
        state.loadingWeeklySeries = false;
        state.error = action.payload as string;
      })
      .addCase(fetchAdminAnalyticsMonthlySeries.pending, (state) => {
        state.loadingMonthlySeries = true;
        state.error = null;
      })
      .addCase(fetchAdminAnalyticsMonthlySeries.fulfilled, (state, action) => {
        state.loadingMonthlySeries = false;
        state.monthlySeries = action.payload;
      })
      .addCase(fetchAdminAnalyticsMonthlySeries.rejected, (state, action) => {
        state.loadingMonthlySeries = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearAdminAnalyticsError } = adminAnalyticsSlice.actions;

export default adminAnalyticsSlice.reducer;
