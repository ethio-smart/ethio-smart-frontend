"use client";

import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { UserManagementUser } from "@/app/types/types";
import UserAvatar from "@/app/components/dashboard/admin/user/UserAvatar";
import {
  RoleBadge,
  VerificationBadge,
} from "@/app/components/dashboard/admin/user/UserBadges";

export default function UserDetailsDialog({
  user,
  index,
  onClose,
  onToggleVerify,
}: {
  user: UserManagementUser | null;
  index: number;
  onClose: () => void;
  onToggleVerify: () => void;
}) {
  return (
    <Dialog open={!!user} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-xl">
        {user && (
          <>
            <DialogHeader>
              <DialogTitle>User Details</DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <div className="flex items-center gap-4 rounded-lg border bg-muted/30 p-4">
                <UserAvatar
                  initials={user.avatar}
                  index={index}
                  size="lg"
                  imageUrl={user.imageurl}
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="truncate font-semibold text-foreground">{user.name}</h3>
                    {user.verified && (
                      <CheckCircle2 className="size-4 shrink-0 text-primary" />
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <RoleBadge role={user.role} />
                    <VerificationBadge status={user.verificationStatus} />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {[
                  { label: "User ID", value: user.id },
                  { label: "Phone", value: user.phone },
                  { label: "Joined", value: user.joinedDate },
                  { label: "Verified", value: user.verified ? "Yes" : "No" },
                  { label: "Backend Role", value: user.backendRole ?? "—" },
                ].map((item) => (
                  <div key={item.label} className="rounded-lg border bg-muted/30 p-3">
                    <p className="text-xs text-muted-foreground">{item.label}</p>
                    <p className="mt-1 text-sm font-medium text-foreground">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <DialogFooter className="gap-2 sm:justify-between">
              <Button
                variant={user.verified ? "outline" : "default"}
                onClick={onToggleVerify}
              >
                {user.verified ? "Unverify User" : "Verify User"}
              </Button>
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
