import { TaskerType } from "@/app/types/types"


export default function TaskerAbout({
  bio,
}: {
  bio?: TaskerType["bio"]
}) {
  if (!bio) return null

  return (
    <div className=" space-y-3">
      <h3 className="text-xl font-bold">About</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {bio}
      </p>
    </div>
  )
}