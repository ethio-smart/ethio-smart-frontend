"use client";

export default function UserManagementHeader({
  totalUsers,
  filteredCount,
}: {
  totalUsers: number;
  filteredCount: number;
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
      <div>
        <h1 className="font-heading font-semibold text-[22px] text-foreground">
          User Management
        </h1>
        <p className="text-[14px] font-caption text-muted-foreground mt-0.5">
          {totalUsers} total users registered on the platform
        </p>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-[12px] font-caption text-muted-foreground bg-muted px-3 py-1.5 rounded-md">
          {filteredCount} result{filteredCount !== 1 ? "s" : ""}
        </span>
      </div>
    </div>
  );
}

