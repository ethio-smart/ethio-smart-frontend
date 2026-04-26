"use client";

import { Badge } from "@/components/ui/badge";

import type { Role, VerificationStatus } from "@/app/types/types";
import { roleStyles, verificationStyles } from "@/app/[locale]/(dashboard)/admin/user-management/data";

export function RoleBadge({ role }: { role: Role }) {
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

