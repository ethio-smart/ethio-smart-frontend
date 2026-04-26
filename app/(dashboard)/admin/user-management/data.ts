import type { UserRole, VerificationStatus } from "@/app/types/types";

export const avatarColors = [
  "bg-primary/20 text-primary",
  "bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400",
  "bg-purple-100 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400",
  "bg-accent/20 text-accent",
  "bg-pink-100 text-pink-600 dark:bg-pink-500/20 dark:text-pink-400",
];

export const verificationStyles: Record<VerificationStatus, string> = {
  Verified: "bg-success/10 text-success",
  Unverified: "bg-accent/10 text-accent",
};

export const roleStyles: Record<UserRole, string> = {
  Client: "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400",
  Tasker: "bg-primary/10 text-primary",
  Admin:
    "bg-purple-100 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400",
};
