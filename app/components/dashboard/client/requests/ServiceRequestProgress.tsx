export default function ServiceRequestProgress() {
  const steps = [
    { label: 'Request Sent', time: 'Oct 20, 09:12', status: 'completed' },
    { label: 'Accepted', time: 'Oct 20, 11:45', status: 'completed' },
    { label: 'In Progress', time: 'Started 10:05', status: 'current' },
    { label: 'Completion', time: 'Pending', status: 'pending' },
  ]

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h4 className="font-semibold mb-4">Service Progress</h4>
      <div className="flex justify-between items-center">
        {steps.map((step, i) => (
          <div key={i} className="flex-1 text-center">
            <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center ${
              step.status === 'completed' ? 'bg-primary text-white' : step.status === 'current' ? 'bg-orange-100 text-orange-500' : 'bg-gray-200 text-gray-400'
            }`}>{i + 1}</div>
            <p className="text-sm mt-2">{step.label}</p>
            <p className="text-xs text-gray-400">{step.time}</p>
          </div>
        ))}
      </div>
    </div>
  )
}