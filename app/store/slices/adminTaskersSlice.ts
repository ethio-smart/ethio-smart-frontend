/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import type { Tasker } from "@/app/types/types";
import { api } from "@/app/utils/axiosinstance";

type AdminTaskersState = {
  taskers: Tasker[];
  pendingTaskers: Tasker[];
  rejectedTaskers: Tasker[];
  selectedTasker: Tasker | null;
  loadingList: boolean;
  loadingPending: boolean;
  loadingRejected: boolean;
  loadingDetail: boolean;
  actionLoading: boolean;
  error: string | null;
};

const initialState: AdminTaskersState = {
  taskers: [],
  pendingTaskers: [],
  rejectedTaskers: [],
  selectedTasker: null,
  loadingList: false,
  loadingPending: false,
  loadingRejected: false,
  loadingDetail: false,
  actionLoading: false,
  error: null,
};

const toTaskerArray = (payload: unknown): Tasker[] => {
  if (Array.isArray(payload)) return payload as Tasker[];

  if (payload && typeof payload === "object") {
    const typedPayload = payload as Record<string, unknown>;
    const candidates = [
      typedPayload.data,
      typedPayload.taskers,
      typedPayload.result,
      typedPayload.items,
    ];

    for (const candidate of candidates) {
      if (Array.isArray(candidate)) {
        return candidate as Tasker[];
      }
    }

    if (typedPayload.id) {
      return [payload as Tasker];
    }
  }

  return [];
};

const toSingleTasker = (payload: unknown): Tasker | null => {
  const taskers = toTaskerArray(payload);
  return taskers.length > 0 ? taskers[0] : null;
};

const getErrorMessage = (error: any, fallback: string) =>
  error?.response?.data?.message || fallback;

export const fetchAdminTaskers = createAsyncThunk(
  "adminTaskers/fetchAdminTaskers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/admin/taskers");
      return toTaskerArray(response.data?.data ?? response.data);
    } catch (error: any) {
      return rejectWithValue(getErrorMessage(error, "Failed to fetch taskers"));
    }
  },
);

export const fetchPendingAdminTaskers = createAsyncThunk(
  "adminTaskers/fetchPendingAdminTaskers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/admin/taskers/pending");
      return toTaskerArray(response.data?.data ?? response.data);
    } catch (error: any) {
      return rejectWithValue(
        getErrorMessage(error, "Failed to fetch pending taskers"),
      );
    }
  },
);

export const fetchRejectedAdminTaskers = createAsyncThunk(
  "adminTaskers/fetchRejectedAdminTaskers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/admin/taskers/rejected");
      return toTaskerArray(response.data?.data ?? response.data);
    } catch (error: any) {
      return rejectWithValue(
        getErrorMessage(error, "Failed to fetch rejected taskers"),
      );
    }
  },
);

export const fetchAdminTaskerById = createAsyncThunk(
  "adminTaskers/fetchAdminTaskerById",
  async (taskerId: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`/admin/tasker/${taskerId}`);
      const tasker = toSingleTasker(response.data?.data ?? response.data);
      if (!tasker) {
        return rejectWithValue("Tasker not found");
      }
      return tasker;
    } catch (error: any) {
      return rejectWithValue(getErrorMessage(error, "Failed to fetch tasker"));
    }
  },
);

export const updateAdminTasker = createAsyncThunk(
  "adminTaskers/updateAdminTasker",
  async (
    {
      taskerId,
      data,
    }: {
      taskerId: string;
      data: Partial<Tasker>;
    },
    { rejectWithValue },
  ) => {
    try {
      const response = await api.patch(`/admin/tasker/${taskerId}`, data);
      const tasker = toSingleTasker(response.data?.data ?? response.data);
      return tasker;
    } catch (error: any) {
      return rejectWithValue(getErrorMessage(error, "Failed to update tasker"));
    }
  },
);

export const verifyAdminTasker = createAsyncThunk(
  "adminTaskers/verifyAdminTasker",
  async (taskerId: string, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/admin/tasker/${taskerId}/verify`);
      return toSingleTasker(response.data?.data ?? response.data) ?? { id: taskerId };
    } catch (error: any) {
      return rejectWithValue(getErrorMessage(error, "Failed to verify tasker"));
    }
  },
);

export const rejectAdminTasker = createAsyncThunk(
  "adminTaskers/rejectAdminTasker",
  async (
    {
      taskerId,
      reason,
    }: {
      taskerId: string;
      reason?: string;
    },
    { rejectWithValue },
  ) => {
    try {
      const response = await api.patch(`/admin/tasker/${taskerId}/reject`, {
        ...(reason ? { reason } : {}),
      });
      return toSingleTasker(response.data?.data ?? response.data) ?? { id: taskerId };
    } catch (error: any) {
      return rejectWithValue(getErrorMessage(error, "Failed to reject tasker"));
    }
  },
);

export const suspendAdminTasker = createAsyncThunk(
  "adminTaskers/suspendAdminTasker",
  async (taskerId: string, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/admin/tasker/${taskerId}/suspend`);
      return toSingleTasker(response.data?.data ?? response.data) ?? { id: taskerId };
    } catch (error: any) {
      return rejectWithValue(getErrorMessage(error, "Failed to suspend tasker"));
    }
  },
);

export const unsuspendAdminTasker = createAsyncThunk(
  "adminTaskers/unsuspendAdminTasker",
  async (taskerId: string, { rejectWithValue }) => {
    try {
      const routeCandidates = [
        `/admin/tasker/${taskerId}/unsuspend`,
        `/api/admin/tasker/${taskerId}/unsuspend`,
        `/admin/taskers/${taskerId}/unsuspend`,
      ];

      let response: any = null;
      let lastError: any;

      for (const route of routeCandidates) {
        try {
          response = await api.patch(route);
          break;
        } catch (error: any) {
          const statusCode = error?.response?.status;
          const message = String(error?.response?.data?.message ?? "").toLowerCase();
          const isRouteNotFound = statusCode === 404 || message.includes("cannot patch");

          if (!isRouteNotFound) {
            throw error;
          }

          lastError = error;
        }
      }

      if (!response) {
        throw lastError;
      }

      return toSingleTasker(response.data?.data ?? response.data) ?? { id: taskerId };
    } catch (error: any) {
      return rejectWithValue(getErrorMessage(error, "Failed to unsuspend tasker"));
    }
  },
);

type TaskerUpdate = Partial<Tasker> & { id: string };

const updateTaskerInList = (taskers: Tasker[], updated: TaskerUpdate | null) => {
  if (!updated?.id) return taskers;
  return taskers.map((tasker) =>
    tasker.id === updated.id ? { ...tasker, ...updated } : tasker,
  );
};

const removeTaskerById = (taskers: Tasker[], taskerId: string) =>
  taskers.filter((tasker) => tasker.id !== taskerId);

const adminTaskersSlice = createSlice({
  name: "adminTaskers",
  initialState,
  reducers: {
    clearAdminTaskersError: (state) => {
      state.error = null;
    },
    clearSelectedTasker: (state) => {
      state.selectedTasker = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminTaskers.pending, (state) => {
        state.loadingList = true;
        state.error = null;
      })
      .addCase(fetchAdminTaskers.fulfilled, (state, action) => {
        state.loadingList = false;
        state.taskers = action.payload;
      })
      .addCase(fetchAdminTaskers.rejected, (state, action) => {
        state.loadingList = false;
        state.error = action.payload as string;
      })
      .addCase(fetchPendingAdminTaskers.pending, (state) => {
        state.loadingPending = true;
        state.error = null;
      })
      .addCase(fetchPendingAdminTaskers.fulfilled, (state, action) => {
        state.loadingPending = false;
        state.pendingTaskers = action.payload;
      })
      .addCase(fetchPendingAdminTaskers.rejected, (state, action) => {
        state.loadingPending = false;
        state.error = action.payload as string;
      })
      .addCase(fetchRejectedAdminTaskers.pending, (state) => {
        state.loadingRejected = true;
        state.error = null;
      })
      .addCase(fetchRejectedAdminTaskers.fulfilled, (state, action) => {
        state.loadingRejected = false;
        state.rejectedTaskers = action.payload;
      })
      .addCase(fetchRejectedAdminTaskers.rejected, (state, action) => {
        state.loadingRejected = false;
        state.error = action.payload as string;
      })
      .addCase(fetchAdminTaskerById.pending, (state) => {
        state.loadingDetail = true;
        state.error = null;
      })
      .addCase(fetchAdminTaskerById.fulfilled, (state, action) => {
        state.loadingDetail = false;
        state.selectedTasker = action.payload;
      })
      .addCase(fetchAdminTaskerById.rejected, (state, action) => {
        state.loadingDetail = false;
        state.error = action.payload as string;
      })
      .addCase(updateAdminTasker.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
      })
      .addCase(updateAdminTasker.fulfilled, (state, action) => {
        state.actionLoading = false;
        const updatedTasker = (action.payload as TaskerUpdate | null) ?? null;
        state.taskers = updateTaskerInList(state.taskers, updatedTasker);
        state.pendingTaskers = updateTaskerInList(
          state.pendingTaskers,
          updatedTasker,
        );
        if (updatedTasker && state.selectedTasker?.id === updatedTasker.id) {
          state.selectedTasker = {
            ...state.selectedTasker,
            ...updatedTasker,
          };
        }
      })
      .addCase(updateAdminTasker.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload as string;
      })
      .addCase(verifyAdminTasker.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
      })
      .addCase(verifyAdminTasker.fulfilled, (state, action) => {
        state.actionLoading = false;
        const updatedTasker = action.payload as TaskerUpdate;
        state.taskers = updateTaskerInList(state.taskers, updatedTasker);
        state.pendingTaskers = removeTaskerById(state.pendingTaskers, updatedTasker.id);
        state.rejectedTaskers = removeTaskerById(state.rejectedTaskers, updatedTasker.id);
        if (state.selectedTasker?.id === updatedTasker.id) {
          state.selectedTasker = {
            ...state.selectedTasker,
            ...updatedTasker,
          };
        }
      })
      .addCase(verifyAdminTasker.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload as string;
      })
      .addCase(rejectAdminTasker.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
      })
      .addCase(rejectAdminTasker.fulfilled, (state, action) => {
        state.actionLoading = false;
        const updatedTasker = action.payload as TaskerUpdate;
        state.taskers = updateTaskerInList(state.taskers, updatedTasker);
        state.pendingTaskers = removeTaskerById(state.pendingTaskers, updatedTasker.id);
        state.rejectedTaskers = updateTaskerInList(
          [
            ...(state.rejectedTaskers.some((tasker) => tasker.id === updatedTasker.id)
              ? state.rejectedTaskers
              : [...state.rejectedTaskers, updatedTasker as Tasker]),
          ],
          updatedTasker,
        );
        if (state.selectedTasker?.id === updatedTasker.id) {
          state.selectedTasker = {
            ...state.selectedTasker,
            ...updatedTasker,
          };
        }
      })
      .addCase(rejectAdminTasker.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload as string;
      })
      .addCase(suspendAdminTasker.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
      })
      .addCase(suspendAdminTasker.fulfilled, (state, action) => {
        state.actionLoading = false;
        const updatedTasker = action.payload as TaskerUpdate;
        state.taskers = updateTaskerInList(state.taskers, updatedTasker);
        state.pendingTaskers = updateTaskerInList(
          state.pendingTaskers,
          updatedTasker,
        );
        state.rejectedTaskers = updateTaskerInList(
          state.rejectedTaskers,
          updatedTasker,
        );
        if (state.selectedTasker?.id === updatedTasker.id) {
          state.selectedTasker = {
            ...state.selectedTasker,
            ...updatedTasker,
          };
        }
      })
      .addCase(suspendAdminTasker.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload as string;
      })
      .addCase(unsuspendAdminTasker.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
      })
      .addCase(unsuspendAdminTasker.fulfilled, (state, action) => {
        state.actionLoading = false;
        const updatedTasker = action.payload as TaskerUpdate;
        state.taskers = updateTaskerInList(state.taskers, updatedTasker);
        state.pendingTaskers = updateTaskerInList(
          state.pendingTaskers,
          updatedTasker,
        );
        state.rejectedTaskers = updateTaskerInList(
          state.rejectedTaskers,
          updatedTasker,
        );
        if (state.selectedTasker?.id === updatedTasker.id) {
          state.selectedTasker = {
            ...state.selectedTasker,
            ...updatedTasker,
          };
        }
      })
      .addCase(unsuspendAdminTasker.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearAdminTaskersError, clearSelectedTasker } =
  adminTaskersSlice.actions;

export default adminTaskersSlice.reducer;
