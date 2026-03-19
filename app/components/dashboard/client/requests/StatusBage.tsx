import { Badge } from "@/components/ui/badge"


export default function StatusBadge({ status }: { status: string }) {

  const styles: Record<string, string> = {
    PENDING: "bg-yellow-100 text-yellow-700",
    ACCEPTED: "bg-blue-100 text-blue-700",
    REJECTED: "bg-red-100 text-red-700",
    EXPIRED: "bg-gray-200 text-gray-700",
    CANCELLED: "bg-rose-100 text-rose-700"
  }

  return (
    <Badge className={styles[status]}>
      {status}
    </Badge>
  )
}