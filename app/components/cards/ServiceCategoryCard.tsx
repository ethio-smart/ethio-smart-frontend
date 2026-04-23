import { LucideIcon } from "lucide-react"
import Link from "next/link"

type ServiceCategoryCardProps = {
  icon: LucideIcon
  bgColor: string
  name: string
  categoryId: string
}

function ServiceCategoryCard({
  icon: Icon,
  bgColor,
  name,
  categoryId,
}: ServiceCategoryCardProps) {
  return (
    <div className="bg-white h-40 rounded-lg shadow flex justify-center items-center">
      <div className="flex flex-col items-center gap-2">
        <div
          className="flex items-center justify-center size-16 rounded-md text-primary"
          style={{ backgroundColor: bgColor }}
        >
          <Icon className="w-6 h-6 text-primary" />
        </div>

        <Link
          href={`en/request/create/${categoryId}?name=${name.toLowerCase()}`}
          className="font-semibold hover:underline"
        >
          {name}
        </Link>
      </div>
    </div>
  )
}

export default ServiceCategoryCard