export default function RecentActivity() {
  const activities = [
    { label: 'Work started', desc: 'Alex updated the status to In Progress', time: '10 minutes ago', color: 'orange' },
    { label: 'tasker arrived', desc: 'Location check-in confirmed', time: '15 minutes ago', color: 'gray' },
    { label: 'Schedule reminder', desc: 'Automated notification sent to tasker', time: '1 hour ago', color: 'gray' },
  ]

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h4 className="font-semibold mb-2">Recent Activity</h4>
      <ul className="space-y-3">
        {activities.map((act, i) => (
          <li key={i} className="flex items-start gap-2">
            <span className={`w-2 h-2 mt-2 rounded-full ${act.color === 'orange' ? 'bg-orange-500' : 'bg-gray-300'}`} />
            <div>
              <p className="font-medium">{act.label}</p>
              <p className="text-gray-400 text-sm">{act.desc}</p>
              <p className="text-gray-300 text-xs">{act.time}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}