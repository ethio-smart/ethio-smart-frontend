
import { LucideIcon } from "lucide-react"
import Link from "next/link"


type ServiceCategoryCardProps={
  icon:LucideIcon,
  bgColor:string,
  name:string,
  categoryId:string
}

function ServiceCategoryCard({icon,bgColor,name,categoryId}:ServiceCategoryCardProps) {
  // const { category } = useParams()
  // const{selectedCategory}=useAppSelector(state=>state.category)
  // const dispatch=useAppDispatch()
  console.log('selected category in card',categoryId)

  
  return (
    <div className="bg-white h-40 rounded-lg shadow flex justify-center items-center">
      <div className="flex flex-col items-center gap-2">
      <div  className={`bg-secondary flex items-center justify-center size-16 rounded-md text-primary`} style={{background:bgColor}}>
        {icon}
        {/* <Icon/> */}
      </div>
        <Link   href={`/request/create/${categoryId}?name=${name.toLowerCase()}`} className="font-semibold hover:underline">{name}</Link >
        </div>
    </div>
  )
}

export default ServiceCategoryCard