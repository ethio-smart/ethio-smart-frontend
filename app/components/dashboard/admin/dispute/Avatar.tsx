import { Avatar as ShadAvatar, AvatarFallback } from "@/components/ui/avatar";

export default function Avatar({ initials }: { initials: string }) {
  return (
    <ShadAvatar className="h-8 w-8">
      <AvatarFallback>{initials}</AvatarFallback>
    </ShadAvatar>
  );
}