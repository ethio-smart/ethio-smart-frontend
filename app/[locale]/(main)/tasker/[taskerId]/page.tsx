// 'use client'
// import Reviews from "@/app/components/tasker/Reviews"
// import SidebarCard from "@/app/components/tasker/SidebarCard"
// import TaskerAbout from "@/app/components/tasker/TaskerBio"
// import TaskerProfileHeader from "@/app/components/tasker/TaskerProfileHeader"
// import TaskerSkills from "@/app/components/tasker/TaskerSkills"


// import { useSearchParams } from "next/navigation"
// export default function TaskerProfilePage() {
 
//   const searchParams = useSearchParams()

//   const taskerParam = searchParams.get("tasker")

//   const tasker = taskerParam ? JSON.parse(taskerParam) : null
//   console.log('tasker profile',tasker)


//   return (
//     <>
//     <div className="max-w-6xl mx-auto py-8  bg-white ">
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//         <div className="lg:col-span-2 space-y-10 shadow p-10 rounded-2xl">
//           <TaskerProfileHeader tasker={tasker} />
//           <TaskerAbout bio={tasker.bio} />
//            <TaskerSkills services={tasker.services} />
           
//           {/* <TaskerAvailability tasker={tasker} /> */}
//           <Reviews reviews={tasker.reviews} />
//         </div>
//         <SidebarCard tasker={tasker} />
//       </div>
//       </div>
//       </>
   
//   )
// }

'use client'

import Reviews from "@/app/components/tasker/Reviews"
import SidebarCard from "@/app/components/tasker/SidebarCard"
import TaskerAbout from "@/app/components/tasker/TaskerBio"
import TaskerProfileHeader from "@/app/components/tasker/TaskerProfileHeader"
import TaskerSkills from "@/app/components/tasker/TaskerSkills"

import { useEffect } from "react"
import { useParams } from "next/navigation"
import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks"
import { fetchTaskerById } from "@/app/store/slices/taskerSlice"

export default function TaskerProfilePage() {
  const dispatch = useAppDispatch()
  const params = useParams()

  const taskerId = params.taskerId as string
  console.log('taskerid',taskerId)
  


  const {
    tasker,
    singleFetchLoading,
    singleFetchError,
  } = useAppSelector((state) => state.tasker)
  console.log('tasker',tasker)

  useEffect(() => {
    if (taskerId) {
      dispatch(fetchTaskerById(taskerId))
    }
  }, [taskerId, dispatch])

  if (singleFetchLoading) {
    return <div className="text-center py-10">Loading...</div>
  }

  if (singleFetchError) {
    return (
      <div className="text-red-500 text-center py-10">
        {singleFetchError}
      </div>
    )
  }

  if (!tasker) {
    return <div className="text-center py-10">No tasker found</div>
  }

  return (
    <div className="max-w-6xl mx-auto py-8 bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-10 shadow p-10 rounded-2xl">
          <TaskerProfileHeader tasker={tasker} />
          <TaskerAbout bio={tasker.bio || ""} />
          <TaskerSkills services={tasker.services || []} />
          <Reviews review={[]} /> {/* TODO: Fetch reviews separately */}
        </div>

        <SidebarCard tasker={tasker} />
      </div>
    </div>
  )
}