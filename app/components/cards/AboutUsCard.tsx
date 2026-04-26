

import { LucideIcon } from "lucide-react"

type AboutUsCardProps = {
  icon: LucideIcon
  title: string
  description: string
}

export default function AboutUsCard({
  icon: Icon,
  title,
  description,
}: AboutUsCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border p-6 space-y-4">
      <div className="h-12 w-12 text-primary rounded-xl bg-[#E6F1EF] flex items-center justify-center">
        <Icon className="h-5 w-5" />
      </div>

      <div>
        <h3 className="font-bold text-lg">{title}</h3>
        <p className="text-sm text-[#343841] mt-2 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  )
}