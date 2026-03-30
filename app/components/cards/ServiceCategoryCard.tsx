import { LucideIcon } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

type ServiceCategoryCardProps={
  icon:LucideIcon,
  bgColor:string,
  name:string,
  categoryId:string
}

function ServiceCategoryCard({icon,bgColor,name}:ServiceCategoryCardProps) {
  // const { category } = useParams()
  
  return (
    <div className="bg-white h-40 rounded-lg shadow flex justify-center items-center">
      <div className="flex flex-col items-center gap-2">
      <div className={`bg-secondary flex items-center justify-center size-16 rounded-md text-primary`} style={{background:bgColor}}>
        {icon}
        {/* <Icon/> */}
      </div>
        <Link href={`/tasks/create/${name.toLowerCase()}`} className="font-semibold hover:underline">{name}</Link >
        </div>
    </div>
  )
}

export default ServiceCategoryCard