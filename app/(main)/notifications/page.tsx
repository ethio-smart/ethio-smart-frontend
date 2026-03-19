import NotificationCard from "@/app/components/cards/NotficationCard"


const notifications = [
  {
    id: "1",
    title: "Task Completed Successfully",
    description:
      'Your task "Home Cleaning" has been marked as completed by the tasker.',
    time: "2 hours ago",
    icon: "check",
    iconColor: "bg-green-100",
    unread: true,
  },
  {
    id: "2",
    title: "Payment Processed",
    description:
      'Payment of $50.00 has been processed for task "Home Cleaning".',
    time: "4 hours ago",
    icon: "payment",
    iconColor: "bg-blue-100",
    unread: true,
  },
  {
    id: "3",
    title: "New Message",
    description:
      "You have a new message from John Doe regarding your task.",
    time: "6 hours ago",
    icon: "message",
    iconColor: "bg-purple-100",
  },
  {
    id: "4",
    title: "Tasker Assigned",
    description:
      'A tasker has been assigned to your "Gardening" task.',
    time: "1 day ago",
    icon: "assigned",
    iconColor: "bg-orange-100",
  },
  {
    id: "5",
    title: "Rate Your Experience",
    description:
      'Please rate your experience with the tasker for "Home Cleaning".',
    time: "1 day ago",
    icon: "rating",
    iconColor: "bg-yellow-100",
  },
]

export default function Notifications() {
  return (
    <div className="max-w-4xl mx-auto py-10 px-4 space-y-4 ">
      <h1 className="text-xl font-semibold">Notifications</h1>
      {notifications.map((notification) => (
        <NotificationCard
          key={notification.id}
          notification={notification}
        />
      ))}
    </div>
  )
}