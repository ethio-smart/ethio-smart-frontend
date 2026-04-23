"use client";

import { Badge } from "@/components/ui/badge";
import { roleStyles, verificationStyles } from "@/app/(dashboard)/admin/user-management/data";
import type { UserRole, VerificationStatus } from "@/app/types/types";

export function RoleBadge({ role }: { role: UserRole }) {
  return (
    <Badge
      variant="outline"
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-caption font-medium ${roleStyles[role]}`}
    >
      {role}
    </Badge>
  );
}

export function VerificationBadge({ status }: { status: VerificationStatus }) {
  return (
    <Badge
      variant="outline"
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-caption font-medium ${verificationStyles[status]}`}
    >
      {status}
    </Badge>
  );
}

