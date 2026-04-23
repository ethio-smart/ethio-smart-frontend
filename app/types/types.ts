/* eslint-disable @typescript-eslint/no-explicit-any */
import { LucideIcon } from "lucide-react";

//user
export type Role = "USER" | "SUPER_ADMIN" | "TASKER" | " SYSTEM_ADMIN";
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
export type Tasker = {
  id: string;
  status: TaskerStatus;
  location?: string;
  bio?: string;
  languages: string[];
  resumeUrl?: string;
  bankName?: string;
  bankAccountNumber?: string;
  nationalIdNumber?: string;
  certifications: string[];
  proposalVideoUrl?: string;
  aiResume?:string;
  availability: boolean;
  rating: number;
  totalReviews: number;
  totalEarnings: number;
  isVerified: boolean;
  user?: User;
  services?: Service[];
};
//category
export type Category = {
  id: string;
  name: string;
  description: string;
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
};

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

export type Dispute={
  id:string,
  bookingId: string,
  reason: string,
  description: string

}
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

//type for dummy data's
// export type Notification = {
//   id: string;
//   title: string;
//   description: string;
//   time: string;
//   icon: LucideIcon;
//   iconColor?: string;
//   unread?: boolean;
// };

export type ReviewType = {
  id: string;
  rating: number;
  comment: string;
  createdAt: Date;
  user: {
    id: string;
    name: string;
  };
};

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

export type TaskerType = {
  id: string;
  userId: string;
  user: {
    id: string;
    name: string;
    email: string;
    image?: string;
  };
  status: string;
  location?: string;
  bio?: string;
  languages: string[];
  resumeUrl?: string | null;
  availability: boolean;
  rating: number;
  totalReviews: number;
  totalEarnings: number;
  isVerified: boolean;
  services: ServiceType[];
  bookings: BookingType[];
  reviews: ReviewType[];
};

// Booking types based on API response
export type PaymentResponse = {
  message: string;
  status: string;
  data: {
    checkout_url: string;
  };
};

export type BookingStatus =
  | "AWAITING_PAYMENT"
  | "CONFIRMED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED"
  | "DISPUTED";

  export type PaymentStatus= 
  |'PENDING'
  |'PAID'
  |'HELD'
  |'RELEASED'
  |'REFUNDED'
  |'FAILED'


export type PaymentState = {
  paymentResponse: PaymentResponse | null;
      paymentHistory: Payment[],
  loading: {
    createPayment: boolean;
    paymentHistory:boolean;
  };
  error: string | null;
};

export type Payment = {
  id: string
  amount: number
  status: PaymentStatus
  chapaRef: string
  bookingId: string
  booking?: Booking[]
  createdAt: string
  updatedAt: string
  
}

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
    taskCompletions:TaskCompletion
};
