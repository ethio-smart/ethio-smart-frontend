import { LucideIcon } from "lucide-react"

//user
export type Role = "USER" | "SUPER_ADMIN" | "TASKER" | "SYSTEM_ADMIN"
export type User = {
  id: string
  firstName: string
  lastName: string
  email: string
  phone?: string | null
  password: string
  imageurl:string,
  role: Role,
  isVerified: boolean,
  tasker?: Tasker
}
//tasker status
export enum TaskerStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  SUSPENDED = "SUSPENDED",
}
//request status
export enum RequestStatus {
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  REJECTED = "REJECTED",
  EXPIRED = "EXPIRED",
  CANCELLED = "CANCELLED"
}
//tasker
export type Tasker ={
  id:string,
  userId: string;
  status: TaskerStatus;
  location?: string | null;
  bio?: string | null;
  languages: string[];
  resumeUrl?: string | null;
  bankName?: string | null;
  bankAccountNumber?: string | null;
  nationalIdNumber?: string | null;
  certifications: string[]; 
  proposalVideoUrl?: string | null;
  availability: boolean;
  rating: number;
  totalReviews: number;
  totalEarnings: number;
  isVerified: boolean;
  aiResume?: string | null;
  createdAt?: string;
  updatedAt?: string;
  user?: User;
  services?: Service[];
  reviews?: Review[];
}
//category
export type Category= {
  id: string
  name: string
  description: string
  createdAt?: string
}

export type CategoryApiResponse = Category & {
  createdAt: string;
};

export type CategoriesResponse = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  data: CategoryApiResponse[];
};
//service request


export type Request= {
  id: string
  userId: string
  categoryId: string
  description: string
  budget?: number
  location: string
  preferedDate?: string
  dynamicData?: Record<string, any>
  status?: RequestStatus

}
export type PriceType = 'HOURLY' | 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'FIXED';

//service
export type Service= {
  id: string;
  title: string;
  description: string;
  price: number;
  priceType: PriceType;
  isActive: boolean;
  categoryId: string;
  taskerId: string;
  createdAt: string;
  updatedAt?: string;
}

export type Invitation = {
  id: string
  serviceRequestId: string
  taskerId: string
  status: string
  serviceRequest: Request
  tasker: Tasker
}


//type for dummy data's
export type Notification = {
  id: string
  title: string
  description: string
  time: string
  icon: LucideIcon
  iconColor?: string
  unread?: boolean
}


export type ReviewType = {
  id: string
  rating: number
  comment: string
  createdAt: Date
  user: {
    id: string
    name: string
  }
}

export type ServiceType = {
  id: string
  name: string
  hourlyRate: number
  taskerId: string
}

export type BookingType = {
  id: string
  status: string
  totalPrice: number
  createdAt: Date
}

export type TaskerType = {
  id: string
  userId: string
  user: {
    id: string
    name: string
    email: string
    image?: string
  }
  status: string
  location?: string
  bio?: string
  languages: string[]
  resumeUrl?: string | null
  availability: boolean
  rating: number
  totalReviews: number
  totalEarnings: number
  isVerified: boolean
  services: ServiceType[]
  bookings: BookingType[]
  reviews: ReviewType[]
}

// Admin tasker-management UI types
export type AdminTaskerStatus = "active" | "pending" | "suspended";

export type AdminVerificationStatus =
  | "verified"
  | "unverified"
  | "pending"
  | "rejected";

export type AdminTasker = {
  id: string;
  name: string;
  avatar: string;
  email: string;
  skills: string[];
  rating: number;
  completedJobs: number;
  status: AdminTaskerStatus;
  verificationStatus: AdminVerificationStatus;
  joinedDate: string;
  location?: string;
  bio?: string;
};

export type PendingTasker = {
  id: string;
  name: string;
  avatar: string;
  skills: string[];
  email: string;
  submittedDate: string;
  backgroundCheck: "passed" | "failed" | "pending";
  idVerified: boolean;
  bio?: string;
};

// Admin user-management module types
export type UserRole = "Client" | "Tasker" | "Admin";

export type VerificationStatus = "Verified" | "Unverified";

export type UserManagementUser = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  role: UserRole;
  verified: boolean;
  verificationStatus: VerificationStatus;
  joinedDate: string;
  avatar: string;
  imageurl: string | null;
  backendRole?: Role;
};

export type AdminUserApiResponse = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  password?: string;
  role: Role;
  createdAt: string;
  updatedAt?: string;
  isVerified: boolean;
  imageurl: string | null;
  tasker?: Tasker | null;
};

export type OfficerApiResponse = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password?: string;
  role: Role;
  createdAt: string;
  updatedAt?: string;
  isVerified: boolean;
  imageurl: string | null;
};

export type OfficerListItem = {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  phone: string;
  role: Role;
  createdAt: string;
  updatedAt?: string;
  isVerified: boolean;
  imageurl: string | null;
};

export type CreateOfficerPayload = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
};

export type OfficerFormValues = CreateOfficerPayload;

export type AdminMeApiResponse = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  password?: string;
  role: Role;
  createdAt: string;
  updatedAt: string;
  isVerified: boolean;
  imageurl: string | null;
  tasker?: Tasker | null;
};

export type AdminProfile = {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  phone: string | null;
  role: Role;
  createdAt: string;
  updatedAt: string;
  isVerified: boolean;
  imageurl: string | null;
  maskedPassword: string;
};

export interface Refund {
  id: string;
  amount: number;
  reason: string;
  approved: boolean;
  paymentId: string;
  createdAt: string;      // Date → string (API returns ISO string)
  processedAt?: string;   // optional because it's nullable

  // relation
  payment?: Payment;
}
export interface Dispute {
  id: string;
  reason: string;
  bookingId: string;
  createdAt: string;

  resolved?: boolean;
  resolvedAt?: string;
  updatedAt?: string;

  againstUserId?: string;
  raisedById?: string;
  refundAmount?: number | null;
  resolutionNote?: string | null;
  resolution?: DisputeResolutionType | null;
  status?: BackendDisputeStatus;

  // UI-facing dispute fields used by admin dispute components
  severity?: SeverityLevel;
  client?: DisputeParty;
  tasker?: DisputeParty;
  issue?: string;
  amount?: number;
  description?: string;
  adminNotes?: string;
  createdDate?: string;
  updatedDate?: string;

  // backend relations
  booking?: DisputeBookingSummary;
  User_Dispute_raisedByIdToUser?: DisputeUserSummary;
  User_Dispute_againstUserIdToUser?: DisputeUserSummary;
}
export type DisputeStatus =
  | "open"
  | "investigating"
  | "resolved"
  | "escalated";

export type SeverityLevel = "low" | "medium" | "high";

export type DisputeResolutionType = "FULL_REFUND" | "NO_REFUND" | "PARTIAL_REFUND";

export type BackendDisputeStatus =
  | "OPEN"
  | "IN_REVIEW"
  | "RESOLVED"
  | "REJECTED"
  | "CLOSED"
  | "open"
  | "investigating"
  | "resolved"
  | "escalated";

export type DisputeUserSummary = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string | null;
  password?: string;
  role?: Role;
  createdAt?: string;
  updatedAt?: string;
  isVerified?: boolean;
  imageurl?: string | null;
};

export type DisputeBookingSummary = Booking & {
  user?: DisputeUserSummary;
  tasker?: Tasker;
  payment?: Payment;
};

export type DisputeParty = {
  name: string;
  email: string;
  avatar: string;
};
export type DisputeResolutionBody = {
  resolution: DisputeResolutionType;
  resolutionNote: string;
  refundAmount?: number;
};
export type PaymentStatus = "PENDING" | "PAID" | "COMPLETED" | "FAILED" | "REFUNDED"; // adjust if needed

export interface Payment {
  id: string;
  amount: number;
  status: PaymentStatus;
  chapaRef?: string;
  bookingId: string;

  createdAt: string;
  updatedAt: string;

  // relations (optional)
  booking?: Booking;
  refund?: Refund;
  payout?: Payout;
}
export type PayoutStatus = "PENDING" | "COMPLETED" | "FAILED"; // adjust if backend differs

export interface Payout {
  id: string;

  totalAmount: number;
  booking?: DisputeBookingSummary;
  User_Dispute_raisedByIdToUser?: DisputeUserSummary;
  User_Dispute_againstUserIdToUser?: DisputeUserSummary;
  taskerAmount: number;

  taskerId: string;
  paymentId: string;

  status: PayoutStatus;

  providerRef?: string;
  processedAt?: string;

  createdAt: string;
  updatedAt: string;

  // relations
  tasker?: Tasker;
  payment?: Payment;
}
export type BookingStatus =
  | "AWAITING_PAYMENT"
  | "CONFIRMED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED"; // adjust if your backend enum differs

export interface Booking {
  id: string;
  status: BookingStatus;

  serviceRequestId: string;
  userId: string;
  taskerId: string;

  createdAt: string;
  updatedAt: string;

  // relations (optional)
  serviceRequest?: ServiceRequest;
  tasker?: Tasker;
  user?: User;

  disputes?: Dispute[];
  payment?: Payment;
  reports?: Report[];
  review?: Review;
  schedules?: Schedule[];
}


export type ScheduleStatus = "PROPOSED" | "ACCEPTED" | "REJECTED";
export type ReportStatus = "PENDING" | "RESOLVED" | "REJECTED";
export type ReportTargetType = "USER" | "TASKER" | "BOOKING" | "SERVICE";

// ==========================
// SERVICE REQUEST
// ==========================

export interface ServiceRequest {
  id: string;
  description: string;
  budget?: number;
  location: string;
  status: RequestStatus;

  userId: string;
  taskerId?: string;
  categoryId: string;

  createdAt: string;
  updatedAt: string;

  preferedDate?: string;
  dynamicData?: any;

  booking?: Booking;
  category?: Category;
  tasker?: Tasker;
  user?: User;

  invitations?: TaskerRequestInvitation[];
}

export interface TaskerRequestInvitation {
  id: string;

  serviceRequestId: string;
  taskerId: string;
  status: RequestStatus;

  createdAt: string;
  updatedAt: string;

  serviceRequest?: ServiceRequest;
  tasker?: Tasker;
}

// ==========================
// REVIEW
// ==========================

export interface Review {
  id: string;
  rating: number;
  comment?: string;

  userId: string;
  taskerId: string;
  bookingId: string;

  createdAt: string;

  booking?: Booking;
  tasker?: Tasker;
  user?: User;
}

// ==========================
// SCHEDULE
// ==========================

export interface Schedule {
  id: string;

  bookingId: string;
  scheduledAt: string;
  status: ScheduleStatus;

  proposedById: string;
  createdAt: string;

  booking?: Booking;
  proposedBy?: User;
}

// ==========================
// REPORT
// ==========================

export interface Report {
  id: string;
  reason: string;
  description?: string;

  status: ReportStatus;
  targetType: ReportTargetType;
  targetId: string;

  reporterId: string;
  bookingId?: string;

  createdAt: string;
  updatedAt: string;

  booking?: Booking;
  reporter?: User;
}

export type AdminAnalyticsTotals = {
  totalBookings: number;
  activeBookings: number;
  earnings: number;
  totalRequests: number;
  totalTaskers: number;
  approvedTaskers?: number;
};

export type AdminAnalyticsOverview = {
  totals: AdminAnalyticsTotals;
};

export type AdminAnalyticsPeriodSnapshot = {
  periodStart: string;
  periodEnd: string;
  totalBookings: number;
  activeBookings: number;
  earnings: number;
  totalRequests: number;
  totalTaskers: number;
};

export type AdminAnalyticsSeriesItem = {
  label: string;
  periodStart: string;
  periodEnd: string;
  totalBookings: number;
  activeBookings: number;
  earnings: number;
  totalRequests: number;
  totalTaskers: number;
};

export type AdminAnalyticsSeriesResponse = {
  weeks?: number;
  months?: number;
  data: AdminAnalyticsSeriesItem[];
};
