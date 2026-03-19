
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";


export default function ProfileCard() {
  return (
    <Card className="shadow-none">
      <CardContent className="flex flex-col items-center text-center pt-6">
        <Avatar className="w-24 h-24 mb-4">
          <AvatarImage src="/profile.png" className="object-cover" />
          <AvatarFallback>AJ</AvatarFallback>
        </Avatar>

        <h2 className="text-lg font-semibold">Alex Johnson</h2>

        <p className="text-sm text-muted-foreground">
          San Francisco, CA • Joined March 2022
        </p>

        <div className="flex gap-2 mt-4">
          <Badge variant="secondary">Identity Verified</Badge>
          <Badge> Client</Badge>
        </div>
      </CardContent>
    </Card>
  )
}