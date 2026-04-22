
"use client"

import TaskCompletionCard from "@/app/components/dashboard/client/task-completion/TaskCompletionCard"
import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks"
import { fetchTaskCompletion } from "@/app/store/slices/taskCompletion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useEffect, useState } from "react"

function TaskCompletionPage() {
  const dispatch = useAppDispatch()

  const { tasks, loading } = useAppSelector(
    (state) => state.task
  )

  const [activeTab, setActiveTab] =
    useState<"PENDING" | "ACCEPTED" | "DECLINED">("PENDING")

  useEffect(() => {
    dispatch(fetchTaskCompletion())
  }, [dispatch])

  const getByStatus = (status: string) =>
  tasks.filter((t) => t.status === status)

const tabData = [
  {
    value: "PENDING",
    label: "Pending",
    data: getByStatus("PENDING"),
  },
  {
    value: "ACCEPTED",
    label: "Accepted",
    data: getByStatus("ACCEPTED"),
  },
  {
    value: "DECLINED",
    label: "Declined",
    data: getByStatus("DECLINED"),
  },
]

  if (loading.fetch) {
    return (
      <div className="p-4 animate-pulse text-muted-foreground bg-white rounded-md text-center border">
        Loading tasks...
      </div>
    )
  }

  return (
    <div className="w-full">
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "PENDING" | "ACCEPTED" | "DECLINED")}>

        {/* Tabs Header */}
        <TabsList className="grid grid-cols-3 w-full max-w-xl">
          {tabData.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="relative"
            >
              {tab.label}

              {tab.data.length > 0 && (
                <span className="ml-2 text-xs bg-primary text-white px-2 py-0.5 rounded-full">
                  {tab.data.length}
                </span>
              )}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Tabs Content */}
        {tabData.map((tab) => (
          <TabsContent key={tab.value} value={tab.value}>
            
            {tab.data.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground bg-white rounded-md p-3  ">
                No {tab.label.toLowerCase()} tasks
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
                {tab.data.map((task) => (
                  <TaskCompletionCard
                    key={task.bookingId}
                    data={task}
                  />
                ))}
              </div>
            )}

          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

export default TaskCompletionPage