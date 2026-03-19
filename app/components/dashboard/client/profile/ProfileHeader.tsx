import { Button } from "@/components/ui/button";


export default function ProfileHeader() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-semibold">Profile Settings</h1>
        <p className="text-sm text-muted-foreground">
          Manage your identity, billing preferences, and account security.
        </p>
      </div>

      <div className="flex gap-3">
        <Button className="">Save Changes</Button>
      </div>
    </div>
  )
}