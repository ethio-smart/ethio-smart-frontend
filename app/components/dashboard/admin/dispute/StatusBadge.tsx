import { Badge } from "@/components/ui/badge";
import type { DisputeStatus } from "@/app/types/types";

export default function StatusBadge({ status }: { status: DisputeStatus }) {
  const map = {
    open: "destructive",
    investigating: "secondary",
    resolved: "default",
    escalated: "outline",
  } as const;

  return <Badge variant={map[status]}>{status}</Badge>;
}