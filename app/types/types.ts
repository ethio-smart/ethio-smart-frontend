/* eslint-disable @typescript-eslint/no-explicit-any */

//user
export type VerificationStatus = "Verified" | "Unverified";
export type Role = "USER" | "SUPER_ADMIN" | "TASKER" | "SYSTEM_ADMIN";
export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string | null;
  password: string;
  imageurl: string;
  role: Role;
  isVerified: boolean;
  tasker?: Tasker;
};
//tasker status
export enum TaskerStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  SUSPENDED = "SUSPENDED",
}
export type PriceType = "HOURLY" | "DAILY" | "WEEKLY" | "MONTHLY" | "FIXED";
export type TaskCompletionStatus =
  | "PENDING"
  | "ACCEPTED"
  | "DECLINED"
//request status
export enum RequestStatus {
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  REJECTED = "REJECTED",
  EXPIRED = "EXPIRED",
  CANCELLED = "CANCELLED",
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

export type Request = {
  id: string;
  userId: string;
  user?: User;
  tittle: string;
  categoryId: string;
  description: string;
  category: Category;
  budget?: number;
  location: string;
  preferedDate?: string;
  invitations?: Invitation[];
  dynamicData?: Record<string, any>;
  status?: RequestStatus;
};

//service
export type Service = {
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
  id: string;
  tittle: string;
  serviceRequestId: string;
  location: string;
  budget: number;
  description: string;
  taskerId: string;
  status: string;
  serviceRequest: Request;
  tasker: Tasker;
  userId: string;
  preferedDate?: string;
  user: User;
  category?: {
    id: string;
    name: string;
    description: string;
  };
};

export type Review ={
  id: string;
  rating: number;
  comment?: string | null;
  userId: string;
  taskerId: string;
  bookingId: string;
 
}

export type TaskCompletion= {
  id:string,
  bookingId: string;
  completionNote?: string;  
  Imageurl:string    
  status?:TaskCompletionStatus
  dynamicData?: Record<string, any>; 
  createdAt?:string
  booking?:Booking

}

export type ServiceRequestFrom= {
  serviceId: string
  location: string
  preferedDate?: string | Date
  notes?: string
  dynamicData?: Record<string, any>
}

// export type Dispute={
//   id:string,
//   bookingId: string,
//   reason: string,
//   description: string

// }
export type NotificationType=
   'SERVICE_REQUEST '|
 ' PAYMENT_UPDATE' |
 ' BOOKING_UPDATE '|
 ' DISPUTE_UPDATE' |
  'REFUND_UPDATE' |
  'TASKER_REQUEST' 

  export type RegisterDeviceToken= {
  token: string;
  platform: 'WEB';
}

export type Notification={
  userId: string;
  title: string;
  message: string;
  type: NotificationType;
  data?: Record<string, string>;
   id: string
   isRead:boolean,
  createdAt: string;
}
export type SearchType={
  query:string,
  originalLanguage:string
}

export type reviewType={
  rating:number
  comment:string
}



export type ServiceType = {
  id: string;
  name: string;
  hourlyRate: number;
  taskerId: string;
};

export type BookingType = {
  id: string;
  status: string;
  totalPrice: number;
  createdAt: Date;
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
  | "CANCELLED"
  | "DISPUTED";

  export type UserManagementUser = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  role: Role;
  verified: boolean;
  verificationStatus: VerificationStatus;
  joinedDate: string;
  avatar: string;
  imageurl: string | null;
  backendRole?: Role;
};

  // export type PaymentStatus= 
  // |'PENDING'
  // |'PAID'
  // |'HELD'
  // |'RELEASED'
  // |'REFUNDED'
  // |'FAILED'


export type PaymentState = {
  paymentResponse: PaymentResponse | null;
      paymentHistory: Payment[],
  loading: {
    createPayment: boolean;
    paymentHistory:boolean;
  };
  error: string | null;
};

// export type Payment = {
//   id: string
//   amount: number
//   status: PaymentStatus
//   chapaRef: string
//   bookingId: string
//   booking?: Booking[]
//   createdAt: string
//   updatedAt: string
  
// }

export type Booking = {
  id: string;
  status: BookingStatus;
  serviceRequestId: string;
  userId: string;
  taskerId: string;
  user?:User
  createdAt: string;
  updatedAt: string;
  serviceRequest: Request;
  tasker: Tasker;
  payment: Payment | null;
    TaskCompletion:TaskCompletion
};
