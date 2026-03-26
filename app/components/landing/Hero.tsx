import Image from "next/image"
import { Star } from "lucide-react"
import { Badge } from "@/components/ui/badge"

import SearchBar from "../common/SearchBar"
import { Card } from "@/components/ui/card"


type Worker = {
  id: number
  name: string
  role: string
  rating: number
  jobs: number
  avatar: string
}

const workers: Worker[] = [
  {
    id: 1,
    name: "Abraham Tadesse",
    role: "Master Electrician",
    rating: 4.9,
    jobs: 128,
    avatar: "/profile.png",
  },
  {
    id: 2,
    name: "Hana Belay",
    role: "Interior Designer & Painter",
    rating: 5.0,
    jobs: 45,
    avatar: "/download.png",
  },
  // {
  //   id: 3,
  //   name: "Dawit Kebede",
  //   role: "Plumbing & Maintenance",
  //   rating: 4.8,
  //   jobs: 215,
  //   avatar: "/profile.png",
  // },
]

export default function Hero() {
  const offsets = [
    "-translate-x-28",
    "translate-x-0",
    "-translate-x-20",
  ]

  return (
    <section className="h-scree w-full bg-[linear-gradient(135deg,#F1FDFA,#DDF1ED)] px-10 py-20">
      <div className="mx-auto max-w-7xl flex  justify-between  ">     
        {/* LEFT  */}
        <div className="lg:max-w-xl w-full text-center space-y-5 lg:text-start">
          <Badge className="inline-block text-xs text-primary rounded-2xl px-6 py-1.5 border border-primary bg-[#E5F6F2] font-medium">
            Verified Local Talent • Secure Payments
          </Badge>

          <h1 className="md:text-6xl text-5xl font-bold leading-tight">
            Find Verified Skilled <br />
            Workers in <span className="text-primary">Ethiopia</span>
          </h1>

          <p className="text-xl text-[#343841]">
            Connect with the top 1% of service professionals in minutes.
            AI-powered matching with secure escrow protection.
          </p>
          {/* search bar */}
          {/* <div className="py-8">
             <SearchBar/>
          </div> */}
         
        </div>

        {/* RIGHT CARDS */}
        <div className="hidden lg:flex flex-col space-y-6  ">
          {workers.map((worker, index) => (
            <Card
              key={worker.id}
              className={`w-[20rem] p-4 border-none shadow-md transform transition duration-300 ${offsets[index]}`}
            >
              <div className="flex gap-4">
                <Image
                  src={worker.avatar}
                  width={56}
                  height={56}
                  alt={worker.name}
                  className="rounded-full object-cover"
                />

                <div className="flex-1">
                  <div className="flex justify-between w-full">
                    <p className="font-medium text-base">{worker.name}</p>
                    <Badge variant={"secondary"} className="text-xs border border-neutral-400 py-0.5 rounded-2xl px-3 font-medium">
                      verified
                    </Badge>
                  </div>

                  <p className="text-xs font-semibold text-neutral-700">
                    {worker.role}
                  </p>

                  <div className="mt-1 flex items-center text-xs gap-4">
                    <div className="flex items-center gap-1 font-medium">
                      <Star size={12} />
                      {worker.rating}
                    </div>
                    <span className="text-neutral-700">
                      · {worker.jobs} Jobs Done
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

      </div>
           <div className="py-20 flex items-center justify-center">
             <SearchBar/>
          </div>
    </section>
  )
}
