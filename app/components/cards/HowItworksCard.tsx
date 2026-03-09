import { LucideIcon } from "lucide-react"

type HowItWorksCardProps = {

  title: string
  description: string
  icon: LucideIcon
}

function HowItWorksCard({
 
  title,
  description,
  icon: Icon,
}: HowItWorksCardProps) {
  return (
    <div className=" bg-white rounded-xl shadow-sm border p-8 space-y-4">
      {/* Icon */}
      <div className="w-14 h-14 flex items-center justify-center bg-secondary rounded-xl">
        <Icon className="w-6 h-6 text-primary" />
      </div>
      <div className="text-left space-y-2">
      <h3 className="text-xl font-bold ">{title}</h3>
      <p className="text-sm leading-relaxed text-[#343841]">{description}</p>
      </div>
    </div>
  )
}

export default HowItWorksCard
