// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
// import { Badge } from '@/components/ui/badge'
// import { Mail, MapPin, Phone, Star } from 'lucide-react'



// function Profile() {
//     return (
//         <>
//             <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
//                 <div className="flex justify-betwee gap-4 items-start">
//                     <Avatar className="w-16 h-16">
//                         <AvatarImage src={'/'} />
//                         <AvatarFallback>
//                             JK
//                         </AvatarFallback>
//                     </Avatar>
//                     <div className='space-y-3'>
//                         <h1 className="text-3xl font-bold text-gray-900 mb-2">John Doe</h1>

//                         {/* <p className="text-xl text-gray-600 mb-">Professional Tasker & Service Provider</p> */}
//                         <Badge variant={'secondary'} className="">
//                             <Star size={14} className='text-yellow-400' />
//                             4.5 Rating
//                         </Badge>
//                         <div className="flex flex-wrap gap-4 text-sm text-gray-600">
//                             <div className="flex items-center gap-2">
//                                 <Mail size={16} />
//                                 <span>john.doe@example.com</span>
//                             </div>
//                             <div className="flex items-center gap-2">
//                                 <Phone size={16} />
//                                 <span>+251 911 234 567</span>
//                             </div>
//                             <div className="flex items-center gap-2">
//                                 <MapPin size={16} />
//                                 <span>Addis Ababa, Ethiopia</span>
//                             </div>
//                         </div>
//                     </div>

//                 </div>
//             </div>
//         </>
//     )
// }

// export default Profile

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Mail, MapPin, Phone, Star } from "lucide-react"

type ProfileProps = {
  name: string
  phone: string
  location: string
  rating: string
  email?: string
}

function Profile({
  name,
  phone,
  location,
  rating,
 
}: ProfileProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
      <div className="flex gap-4 items-start">

        <Avatar className="w-16 h-16">
          <AvatarImage src="/" />
          <AvatarFallback>
            {name?.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <div className="space-y-3">
          <h1 className="text-3xl font-bold text-gray-900">
            {name}
          </h1>

          <Badge variant="secondary">
            <Star size={14} className="text-yellow-400" />
            {rating}
          </Badge>

          <div className="flex flex-wrap gap-4 text-sm text-gray-600">

            {/* <div className="flex items-center gap-2">
              <Mail size={16} />
              <span>{email}</span>
            </div> */}

            <div className="flex items-center gap-2">
              <Phone size={16} />
              <span>{phone}</span>
            </div>

            <div className="flex items-center gap-2">
              <MapPin size={16} />
              <span>{location}</span>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile