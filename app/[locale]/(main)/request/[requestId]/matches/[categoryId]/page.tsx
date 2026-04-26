
"use client"
import { useEffect } from "react"
import { useParams } from "next/navigation"
import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks"
import { fetchTaskersByCategory } from "@/app/store/slices/taskerSlice"

import FilterSidebar from "@/app/components/matches/FliterSidebar"
import MatchesHeader from "@/app/components/matches/MatchesHeader"
import TaskerCard from "@/app/components/matches/TaskerCard"
import AppPagination from "@/app/components/common/Pagnation"


export default function TaskerMatchesPage() {
  const { categoryId, requestId } = useParams<{ categoryId: string; requestId: string; name: string }>()
  // console.log('request id from tasker matches page', requestId)
  // console.log('category id from tasker matches page', categoryId)
  const dispatch = useAppDispatch()
  const { taskersByCategory, fetchLoading } =
  useAppSelector((state) => state.tasker)
  // console.log('tasker by category', taskersByCategory)
  const taskers = taskersByCategory[categoryId] || []
  // console.log('taskers⛷️⛷️⛷️⛷️⛷️', taskers)

  useEffect(() => {
    if (categoryId && !taskers.length) {
      dispatch(fetchTaskersByCategory(categoryId))
    }
  }, [categoryId, dispatch, taskers.length])

  //loading state
    if (fetchLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm text-gray-500">Finding best taskers...</p>
        </div>
      </div>
    )
  }

  

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <MatchesHeader length={taskers.length}/>
      <div className="max-w-4xl mx-auto px-4 py-10  gap-8">
        {/* Sidebar */}
        {/* <div>
          <FilterSidebar/>
        </div> */}
        {/* Tasker List */}
        <div className="space-y-6 gri grid-cols-">
          {taskers.length === 0 ? (
            <p className="text-center bg-white p-10 rounded-lg shadow-xs text-gray-500">
              No taskers found
            </p>
          ) : (
            taskers.map((tasker) => (
              <TaskerCard
                requestId={requestId}
                key={tasker.taskerId}
                tasker={tasker}
              />
            ))
          )}

        </div>
      </div>
        <div className="space-y-7 pb-7">
        <AppPagination totalPages={taskers.length} currentPage={1} onPageChange={(page) => console.log("Go to page:", page)} />
          </div>
    </div>
  )
}