'use client'
import Reviews from "@/app/components/tasker/Reviews"
import SidebarCard from "@/app/components/tasker/SidebarCard"
import TaskerAvailability from "@/app/components/tasker/TaskerAvailability"
import TaskerAbout from "@/app/components/tasker/TaskerBio"
import TaskerProfileHeader from "@/app/components/tasker/TaskerProfileHeader"
import TaskerSkills from "@/app/components/tasker/TaskerSkills"
import { dummyTasker } from "@/lib/dummy.data"


export default function TaskerProfilePage() {
  const tasker = dummyTasker

  return (
   
    <>
    
    <div className="max-w-6xl mx-auto py-8  bg-white ">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-10 shadow p-10 rounded-2xl">
          <TaskerProfileHeader tasker={tasker} />
          <TaskerAbout bio={tasker.bio} />
          <TaskerSkills services={tasker.services} />
          <TaskerAvailability />
          <Reviews reviews={tasker.reviews} />
        </div>
        <SidebarCard tasker={tasker} />
      </div>
      </div>
      </>
   
  )
}