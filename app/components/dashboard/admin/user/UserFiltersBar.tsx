// "use client";

// import { Search } from "lucide-react";
// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import type { UserRole } from "@/app/types/types";

// export type RoleFilter = "All" | UserRole;

// export default function UserFiltersBar({
//   search,
//   onSearchChange,
//   roleFilter,
//   onRoleFilterChange,
// }: {
//   search: string;
//   onSearchChange: (value: string) => void;
//   roleFilter: RoleFilter;
//   onRoleFilterChange: (value: RoleFilter) => void;
// }) {
//   return (
//     <div className="flex flex-col gap-3 sm:flex-row">
//       <div className="relative flex-1">
//         <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
//         <Input
//           value={search}
//           onChange={(e) => onSearchChange(e.target.value)}
//           placeholder="Search by name, email, or phone..."
//           className="pl-9"
//         />
//       </div>

//       <Select
//         value={roleFilter}
//         onValueChange={(value) => onRoleFilterChange(value as RoleFilter)}
//       >
//         <SelectTrigger className="w-full sm:w-45">
//           <SelectValue placeholder="All Roles" />
//         </SelectTrigger>
//         <SelectContent>
//           <SelectItem value="All">All Roles</SelectItem>
//           <SelectItem value="Client">Client</SelectItem>
//           <SelectItem value="Tasker">Tasker</SelectItem>
//           <SelectItem value="Admin">Admin</SelectItem>
//         </SelectContent>
//       </Select>
//     </div>
//   );
// }
"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { UserRole } from "@/app/types/types";

export type RoleFilter = "All" | UserRole;

const ROLE_LABELS: Record<UserRole, string> = {
  USER: "User",
  TASKER: "Tasker",
  SYSTEM_ADMIN: "System Admin",
  SUPER_ADMIN: "Super Admin",
};

export default function UserFiltersBar({
  search,
  onSearchChange,
  roleFilter,
  onRoleFilterChange,
}: {
  search: string;
  onSearchChange: (value: string) => void;
  roleFilter: RoleFilter;
  onRoleFilterChange: (value: RoleFilter) => void;
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by name, email, or phone..."
          className="pl-9"
        />
      </div>

      <Select
        value={roleFilter}
        onValueChange={(value) => onRoleFilterChange(value as RoleFilter)}
      >
        <SelectTrigger className="w-full sm:w-45">
          <SelectValue placeholder="All Roles" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="All">All Roles</SelectItem>
          {(Object.keys(ROLE_LABELS) as UserRole[]).map((role) => (
            <SelectItem key={role} value={role}>
              {ROLE_LABELS[role]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}