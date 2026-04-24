import { Badge } from "@/components/ui/badge"


export default function StatusBadge({ status }: { status: string }) {

  const styles: Record<string, string> = {
    // Request statuses
    PENDING: "bg-yellow-100 text-yellow-700",
    ACCEPTED: "bg-blue-100 text-blue-700",
    REJECTED: "bg-red-100 text-red-700",
    EXPIRED: "bg-gray-200 text-gray-700",
    CANCELLED: "bg-rose-100 text-rose-700",
    
    // Booking statuses
    AWAITING_PAYMENT: "bg-orange-100 text-orange-800 border-orange-200",
    CONFIRMED: "bg-green-100 text-green-800 border-green-200",
    IN_PROGRESS: "bg-blue-100 text-blue-800 border-blue-200",
    COMPLETED: "bg-emerald-100 text-emerald-800 border-emerald-200",
    DISPUTED: "bg-red-100 text-red-800 border-red-200"
  }

  return (
    <Badge className={styles[status]}>
      {status}
    </Badge>
  )
}