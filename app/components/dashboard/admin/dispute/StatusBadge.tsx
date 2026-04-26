import { Badge } from "@/components/ui/badge";
import type { BackendDisputeStatus, DisputeStatus } from "@/app/types/types";

export default function StatusBadge({ status }: { status: DisputeStatus | BackendDisputeStatus }) {
  const normalized = String(status).toUpperCase();

  const map: Record<string, "destructive" | "secondary" | "default" | "outline"> = {
    OPEN: "destructive",
    IN_REVIEW: "secondary",
    RESOLVED: "default",
    REJECTED: "outline",
    CLOSED: "outline",
    open: "destructive",
    investigating: "secondary",
    resolved: "default",
    escalated: "outline",
  };

  const label = normalized.replace(/_/g, " ");

  return <Badge variant={map[status] ?? map[normalized] ?? "outline"}>{label}</Badge>;
}