
export default function MatchesHeader({length}:{length:number}) {
  console.log('length',length)
  return (
    <div className="bg-secondary py-12">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
        <div>
          <p className="text-sm text-primary font-medium">
            BEST MATCHES FOR YOUR TASK
          </p>
          <h1 className="text-4xl font-bold text-gray-900 mt-2">
            {/* Top {tasker[0].services[0].category.name} in Addis Ababa */}
          </h1>
          <p className="text-gray-600 mt-3">
            We’ve found {length} available professionals who match your request.
            Compare their profiles and send a request directly.
          </p>
        </div>

        {/* <div className="bg-white rounded-xl px-6 py-4 flex items-center gap-4 shadow-sm">
          <Wrench className="text-green-600" />
          <div>
            <p className="text-xs text-gray-500">SELECTED TASK</p>
            <p className="font-semibold">Emergency Leak Repair</p>
          </div>
        </div> */}
      </div>
    </div>
  )
}