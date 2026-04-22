import {
 
  CreditCard,

  UserCheck,
 
  Info,
  AlertTriangle,

} from "lucide-react"

export const notificationUIConfig = {
  SERVICE_REQUEST: {
    icon: UserCheck,
    color: "text-purple-600",
    bg: "bg-blue-50",
  },
  TASKER_REQUEST: {
    icon: UserCheck,
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
  BOOKING_UPDATE: {
    icon: Info,
    color: "text-orange-600",
    bg: "bg-blue-50",
  },
  PAYMENT_UPDATE: {
    icon: CreditCard,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  REFUND_UPDATE: {
    icon: CreditCard,
    color: "text-purple-600",
    bg: "bg-emerald-50",
  },
  DISPUTE_UPDATE: {
    icon: AlertTriangle,
    color: "text-red-600",
    bg: "bg-yellow-50",
  },
} as const