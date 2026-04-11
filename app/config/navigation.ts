
import {
  LayoutDashboard,
  FileText,
  CreditCard,
  Star,
  AlertTriangle,
  User,
  Briefcase,
  CalendarCheck,
  Wallet,
  Shield,
  Users
} from "lucide-react"

export const navigation = {
  USER: [
    { name: "Dashboard", href: "/client/dashboard", icon: LayoutDashboard },
    { name: "Requests", href: "/client/requests", icon: FileText },
      { name: "Booking", href: "/client/bookings", icon: Star },
    { name: "Payments", href: "/client/payments", icon: CreditCard },
    { name: "Reviews", href: "/client/reviews", icon: Star },
    { name: "Disputes", href: "/client/disputes", icon: AlertTriangle },
    { name: "Profile", href: "/client/profile", icon: User },
  ],

  TASKER: [
    { name: "Dashboard", href: "/tasker/dashboard", icon: LayoutDashboard },
    { name: "Services", href: "/tasker/services", icon: Briefcase },
    { name: "Bookings", href: "/tasker/bookings", icon: CalendarCheck },
     { name: " Requests", href: "/tasker/request", icon: FileText },
    { name: "Reviews", href: "/tasker/reviews", icon: Star },
    { name: "Transactions", href: "/tasker/transactions", icon: Wallet },
    { name: "Profile", href: "/tasker/profile", icon: User },
  ],

  ADMIN: [
    { name: "Dashboard", href: "/super-admin/dashboard", icon: LayoutDashboard },
    { name: "Users", href: "/super-admin/users", icon: Users },
    { name: "Services", href: "/super-admin/services", icon: Briefcase },
    { name: "Disputes", href: "/super-admin/disputes", icon: AlertTriangle },
    { name: "Transactions", href: "/super-admin/transactions", icon: Wallet },
    { name: "Booking", href: "/admin/booking-managent", icon: Star },
    { name: "Settings", href: "/super-admin/settings", icon: Shield },
  ],

  OFFICER: [
    { name: "Dashboard", href: "/system-admin/dashboard", icon: LayoutDashboard },
    { name: "Users", href: "/system-admin/users", icon: Users },
    { name: "Services", href: "/system-admin/services", icon: Briefcase },
    { name: "Disputes", href: "/system-admin/disputes", icon: AlertTriangle },
    { name: "Transactions", href: "/system-admin/transactions", icon: Wallet },
    { name: "Reviews", href: "/system-admin/reviews", icon: Star },
    { name: "Settings", href: "/system-admin/settings", icon: Shield },
  ],
}