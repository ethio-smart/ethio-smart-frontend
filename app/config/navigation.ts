
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
  Users,
  AlarmClockCheck
} from "lucide-react"

export const navigation = {
  USER: [
    { name: "Dashboard", href: "/client/dashboard", icon: LayoutDashboard },
    { name: "Requests", href: "/client/requests", icon: FileText },
      { name: "Booking", href: "/client/bookings", icon: Star },
    { name: "Payments", href: "/client/payments", icon: CreditCard },
    { name: "Task Completion", href: "/client/task-completion", icon: AlarmClockCheck },
    // { name: "Reviews", href: "/client/reviews", icon: Star },
    { name: "Disputes", href: "/client/disputes", icon: AlertTriangle },
    { name: "Profile", href: "/client/profile", icon: User },
  ],

  TASKER: [
    { name: "Dashboard", href: "/tasker/dashboard", icon: LayoutDashboard },
    { name: "Services", href: "/tasker/services", icon: Briefcase },
    { name: "Bookings", href: "/tasker/bookings", icon: CalendarCheck },
     { name: " Requests", href: "/tasker/request", icon: FileText },
    { name: "Reviews", href: "/tasker/reviews", icon: Star },
     { name: "Disputes", href: "/tasker/disputes", icon: AlertTriangle },
    // { name: "Transactions", href: "/tasker/transactions", icon: Wallet },
    { name: "Profile", href: "/tasker/profile", icon: User },
  ],

  SUPER_ADMIN: [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Users", href: "/admin/user-management", icon: Users },
    { name: "Officers", href: "/admin/officers", icon: Shield },
    { name: "Taskers", href: "/admin/tasker-admin", icon: Users },
    { name: "Pending Taskers", href: "/admin/pending-taskers", icon: Shield },
    { name: "Categories", href: "/admin/category-management", icon: Briefcase },
    { name: "Disputes", href: "/admin/disputes", icon: AlertTriangle },
    { name: "Transactions", href: "/admin/payments", icon: Wallet },
    { name: "Bookings", href: "/admin/booking-management", icon: CalendarCheck },
    // { name: "Settings", href: "/admin/settings", icon: Shield },
    
  ],

  SYSTEM_ADMIN: [
    // { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Taskers", href: "/admin/tasker-admin", icon: Users },
    { name: "Pending Taskers", href: "/admin/pending-taskers", icon: Shield },
    { name: "Disputes", href: "/admin/disputes", icon: AlertTriangle },
    { name: "Bookings", href: "/admin/booking-management", icon: CalendarCheck },
  ],

 
}