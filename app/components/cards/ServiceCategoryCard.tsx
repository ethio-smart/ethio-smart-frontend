import { LucideIcon } from "lucide-react"
import Link from "next/link"

type ServiceCategoryCardProps={
  icon:LucideIcon,
  bgColor:string,
  name:string,
}

function ServiceCategoryCard({icon,bgColor,name}:ServiceCategoryCardProps) {
  return (
    <div className="bg-white h-40 rounded-lg shadow flex justify-center items-center">
      <div className="flex flex-col items-center gap-2">
      <div className={`bg-${bgColor} flex items-center justify-center size-16 rounded-md `} style={{background:bgColor}}>
        {icon}
      </div>
        <Link href={'/tasks/create'} className="font-semibold hover:underline">{name}</Link >
        </div>
    </div>
  )
}

export default ServiceCategoryCard