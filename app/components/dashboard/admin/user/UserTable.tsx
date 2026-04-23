"use client";

import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { UserManagementUser, VerificationStatus } from "@/app/types/types";
import UserAvatar from "@/app/components/dashboard/admin/user/UserAvatar";
import {
  RoleBadge,
  VerificationBadge,
} from "@/app/components/dashboard/admin/user/UserBadges";

export default function UserTable({
  users,
  allUsers,
  onView,
  onToggleVerify,
}: {
  users: UserManagementUser[];
  allUsers: UserManagementUser[];
  onView: (user: UserManagementUser, index: number) => void;
  onToggleVerify: (id: string) => void;
}) {
  const verificationCounts: Record<VerificationStatus, number> = {
    Verified: allUsers.filter((u) => u.verified).length,
    Unverified: allUsers.filter((u) => !u.verified).length,
  };

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              {[
                "User",
                "Email",
                "Phone",
                "Role",
                "Verified",
                "Joined Date",
                "Actions",
              ].map((header) => (
                <TableHead key={header} className="px-4 py-3 text-xs">
                  {header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="py-12 text-center text-muted-foreground">
                  No users match your search criteria.
                </TableCell>
              </TableRow>
            ) : (
              users.map((user) => {
                const originalIndex = allUsers.findIndex((u) => u.id === user.id);
                return (
                  <TableRow key={user.id}>
                    <TableCell className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <UserAvatar
                          initials={user.avatar}
                          index={originalIndex}
                          imageUrl={user.imageurl}
                        />
                        <div>
                          <div className="flex items-center gap-1.5">
                            <p className="font-medium text-foreground">{user.name}</p>
                            {user.verified && (
                              <CheckCircle2 className="size-4 shrink-0 text-primary" />
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground">{user.id}</p>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell className="px-4 py-3 text-muted-foreground">{user.email}</TableCell>
                    <TableCell className="px-4 py-3 text-muted-foreground">{user.phone ?? "—"}</TableCell>
                    <TableCell className="px-4 py-3"><RoleBadge role={user.role} /></TableCell>
                    <TableCell className="px-4 py-3">
                      <VerificationBadge
                        status={user.verificationStatus}
                      />
                    </TableCell>
                    <TableCell className="px-4 py-3 text-muted-foreground">{user.joinedDate}</TableCell>

                    <TableCell className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => onView(user, originalIndex)}
                        >
                          View
                        </Button>
                        <Button
                          size="sm"
                          variant={user.verified ? "outline" : "default"}
                          onClick={() => onToggleVerify(user.id)}
                        >
                          {user.verified ? "Unverify" : "Verify"}
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </CardContent>

      <CardFooter className="justify-between gap-2">
        <p className="text-xs text-muted-foreground">
          Showing <span className="font-semibold text-foreground">{users.length}</span> of{" "}
          <span className="font-semibold text-foreground">{allUsers.length}</span> users
        </p>
        <div className="flex items-center gap-1">
          {(Object.keys(verificationCounts) as VerificationStatus[]).map((status) => (
            <Badge key={status} variant="outline" className="text-xs">
              {verificationCounts[status]} {status}
            </Badge>
          ))}
        </div>
      </CardFooter>
    </Card>
  );
}
