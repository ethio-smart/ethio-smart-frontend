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
export type PriceType = "HOURLY" | "DAILY" | "WEEKLY" | "MONTHLY" | "FIXED";

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

//type for dummy data's
export type Notification = {
  id: string;
  title: string;
  description: string;
  time: string;
  icon: LucideIcon;
  iconColor?: string;
  unread?: boolean;
};

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

export type PaymentState = {
  paymentResponse: PaymentResponse | null;
  loading: {
    createPayment: boolean;
  };
  error: string | null;
};

export type Payment = {
  id: string;
  amount: number;
  status: string;
  paymentMethod: string;
  createdAt: string;
  updatedAt: string;
};

export type Booking = {
  id: string;
  status: BookingStatus;
  serviceRequestId: string;
  userId: string;
  taskerId: string;
  createdAt: string;
  updatedAt: string;
  serviceRequest: Request;
  tasker: Tasker;
  payment: Payment | null;
};
