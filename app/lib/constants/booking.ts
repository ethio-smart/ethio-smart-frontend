import { BookingStatus, PaymentStatus } from "@/app/types/types";

   export const bookingStatusStyles: Record<BookingStatus, string> = {
  AWAITING_PAYMENT: 'bg-yellow-100 text-yellow-700',
  CONFIRMED: 'bg-blue-100 text-blue-700',
  IN_PROGRESS: 'bg-purple-100 text-purple-700',
  COMPLETED: 'bg-green-100 text-green-700',
  CANCELLED: 'bg-gray-100 text-gray-600',
  DISPUTED: 'bg-red-100 text-red-700',
};

  export const paymentStatusStyles: Record<PaymentStatus, string> = {
  PENDING: 'bg-yellow-100 text-yellow-700',
  PAID: 'bg-blue-100 text-blue-700',
  HELD: 'bg-orange-100 text-orange-700',
  RELEASED: 'bg-green-100 text-green-700',
  REFUNDED: 'bg-red-100 text-red-700',
  FAILED: 'bg-gray-100 text-gray-600',
}