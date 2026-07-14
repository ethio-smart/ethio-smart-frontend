/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { api } from "@/app/utils/axiosinstance";
import type {
  AdminUserApiResponse,
  UserManagementUser,
  UserRole,
  VerificationStatus,
} from "@/app/types/types";

type AdminUsersState = {
  users: UserManagementUser[];
  loading: boolean;
  error: string | null;
};

const initialState: AdminUsersState = {
  users: [],
  loading: false,
  error: null,
};

const mapBackendRoleToUiRole = (role: AdminUserApiResponse["role"]): UserRole => {
  switch (role) {
    case "TASKER":
      return "TASKER";
    case "USER":
      return "USER";
    case "SUPER_ADMIN":
    case "SYSTEM_ADMIN":
    default:
      return "SUPER_ADMIN";
  }
};

const getInitials = (firstName: string, lastName: string) =>
  `${firstName?.[0] ?? ""}${lastName?.[0] ?? ""}`.toUpperCase();

const formatJoinedDate = (createdAt: string) =>
  new Date(createdAt).toLocaleDateString(undefined, {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });

const normalizeAdminUser = (user: AdminUserApiResponse): UserManagementUser => {
  const verifiedStatus: VerificationStatus = user.isVerified ? "Verified" : "Unverified";

  return {
    id: user.id,
    name: `${user.firstName} ${user.lastName}`.trim(),
    email: user.email,
    phone: user.phone,
    role: mapBackendRoleToUiRole(user.role),
    verified: user.isVerified,
    verificationStatus: verifiedStatus,
    joinedDate: formatJoinedDate(user.createdAt),
    avatar: getInitials(user.firstName, user.lastName),
    imageurl: user.imageurl,
    backendRole: user.role,
  };
};

const coerceUserArray = (payload: unknown): AdminUserApiResponse[] => {
  if (Array.isArray(payload)) return payload as AdminUserApiResponse[];

  if (payload && typeof payload === "object") {
    const typedPayload = payload as Record<string, unknown>;
    const nestedCandidates = [typedPayload.data, typedPayload.users, typedPayload.result];
    for (const candidate of nestedCandidates) {
      if (Array.isArray(candidate)) return candidate as AdminUserApiResponse[];
    }
    if (typedPayload.id && typedPayload.firstName && typedPayload.lastName) {
      return [payload as AdminUserApiResponse];
    }
  }

  return [];
};

export const fetchAdminUsers = createAsyncThunk(
  "adminUsers/fetchAdminUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/admin/users");
      const users = coerceUserArray(response.data?.data ?? response.data);
      return users.map(normalizeAdminUser);
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch admin users",
      );
    }
  },
);

const adminUsersSlice = createSlice({
  name: "adminUsers",
  initialState,
  reducers: {
    clearAdminUsersError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchAdminUsers.fulfilled,
        (state, action: PayloadAction<UserManagementUser[]>) => {
          state.loading = false;
          state.users = action.payload;
        },
      )
      .addCase(fetchAdminUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearAdminUsersError } = adminUsersSlice.actions;
export default adminUsersSlice.reducer;
