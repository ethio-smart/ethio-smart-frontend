import { Tasker } from "@/app/types/types"
import { CheckCircle } from "lucide-react"

export default function TaskerAvailability({tasker}:{tasker:Tasker}) {

// const days = ["MON","TUE","WED","THU","FRI","SAT","SUN"]

// const times = ["08:00","10:00","12:00","14:00","16:00","18:00"]

// const availability = [
//   { day: "MON", slots: ["10:00","18:00"] },
//   { day: "WED", slots: ["10:00"] },
//   { day: "FRI", slots: ["14:00","16:00"] },
//   { day: "SUN", slots: ["08:00",""] },
// ]

// const isAvailable = (day:string,time:string)=>{
//   return availability.some(
//     a => a.day === day && a.slots.includes(time)
//   )
// }

return (
<> <h3 className="text-xl font-bold">Availability</h3>
<div className="border rounded-lg overflow-hidden">
    <div className="flex items-center gap-2">
         {tasker.availability ? (
              <CheckCircle className="text-green-500" size={16} />
            ) : (
              <CheckCircle className="text-gray-400" size={16} />
            )}
            <span>
              {tasker.availability ? "Available for work" : "Currently unavailable"}
            </span>
            </div>
  {/* header */}
  {/* <div className="grid grid-cols-8 bg-gray50 text-sm font-medium bg-secondary">
    <div></div>
    {days.map(day => (
      <div key={day} className="p-3 text-center">
        {day}
      </div>
    ))}
  </div> */}

  {/* rows */}
  {/* {times.map(time => (
    <div key={time} className="grid grid-cols-8 border-t"> */}

      {/* time label */}
      {/* <div className="p-3 text-sm text-gray-500 ">
        {time}
      </div>

      {days.map(day => {

        const active = isAvailable(day,time)

        return (
          <div
            key={day}
            className={`h-12 border-l flex items-center justify-center
            ${active ? "bg-secondary" : "bg-white"}
            `}
          />
        )
      })}
    </div>
  ))} */}

</div>
</>
)
}