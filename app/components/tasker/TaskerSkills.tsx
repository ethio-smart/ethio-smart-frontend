
import { ServiceType } from "@/app/types/types"
import { Badge } from "@/components/ui/badge"

export default function TaskerSkills({
  services,
}: {
  services: ServiceType[]
}) {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold">Services & Skills</h3>

      <div className="flex flex-wrap gap-2">
        {services.map(service => (
          <Badge key={service.id} className="py-1 px-3 " variant="secondary">
            {service.name}
          </Badge>
        ))}
      </div>
    </div>
  )
}