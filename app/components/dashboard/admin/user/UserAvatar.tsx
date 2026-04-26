"use client";

import { avatarColors } from "@/app/[locale]/(dashboard)/admin/user-management/data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function UserAvatar({
  initials,
  index,
  imageUrl,
  size = "sm",
}: {
  initials: string;
  index: number;
  imageUrl?: string | null;
  size?: "sm" | "lg";
}) {
  const sizeClass =
    size === "lg" ? "w-14 h-14 text-[16px]" : "w-8 h-8 text-[11px]";

  return (
    <Avatar className={sizeClass}>
      {imageUrl ? <AvatarImage src={imageUrl} alt={initials} /> : null}
      <AvatarFallback
        className={`font-caption font-semibold ${
          avatarColors[index % avatarColors.length]
        }`}
      >
        {initials}
      </AvatarFallback>
    </Avatar>
  );
}

