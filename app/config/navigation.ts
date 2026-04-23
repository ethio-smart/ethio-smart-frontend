
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
    { name: "Service Requests", href: "/client/requests", icon: FileText },
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

  SUPER_ADMIN: [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Users", href: "/admin/user-management", icon: Users },
    { name: "Taskers", href: "/admin/tasker-admin", icon: Users },
    { name: "Categories", href: "/admin/category-management", icon: Briefcase },
    { name: "Disputes", href: "/admin/disputes", icon: AlertTriangle },
    { name: "Transactions", href: "/admin/payments", icon: Wallet },
    { name: "Bookings", href: "/admin/booking-management", icon: CalendarCheck },
    { name: "Settings", href: "/admin/settings", icon: Shield },
    
  ],

  SYSTEM_ADMIN: [
    { name: "Dashboard", href: "/system-admin/dashboard", icon: LayoutDashboard },
    { name: "Users", href: "/system-admin/users", icon: Users },
    { name: "Services", href: "/system-admin/services", icon: Briefcase },
    { name: "Disputes", href: "/system-admin/disputes", icon: AlertTriangle },
    { name: "Transactions", href: "/system-admin/transactions", icon: Wallet },
    { name: "Reviews", href: "/system-admin/reviews", icon: Star },
    { name: "Settings", href: "/system-admin/settings", icon: Shield },
  ],
}