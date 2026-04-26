import { Badge } from "@/components/ui/badge";
import { SeverityLevel } from "@/app/types/types";

export default function SeverityBadge({ severity }: { severity: SeverityLevel }) {
  return <Badge variant="outline">{severity}</Badge>;
}