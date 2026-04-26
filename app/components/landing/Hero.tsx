import Image from "next/image"
import { Star } from "lucide-react"
import { Badge } from "@/components/ui/badge"

import SearchBar from "../common/SearchBar"
import { Card } from "@/components/ui/card"
import { useTranslations } from "next-intl"


type tasker = {
  id: number
  name: string
  role: string
  rating: number
  jobs: number
  avatar: string
}

const taskers: tasker[] = [
  {
    id: 1,
    name: "Abraham Tadesse",
    role: "Master Electrician",
    rating: 4.9,
    jobs: 128,
    avatar: "/men%20worker%20profile.jpg",
  },
  {
    id: 2,
    name: "Hana Belay",
    role: "Interior Designer & Painter",
    rating: 5.0,
    jobs: 45,
    avatar: "/women%20worker%20for%20profile.jpg",
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
     const tHero = useTranslations("hero")

  return (
    
    <section className="w-full bg-[radial-gradient(circle_at_top_right,#d0f2ea_0%,#f3fbf8_45%,#eef6f3_100%)] px-6 py-16 md:px-10 md:py-20">
      <div className="mx-auto max-w-7xl flex flex-col gap-10 lg:flex-row lg:justify-between">     
        {/* LEFT  */}
        <div className="w-full space-y-5 text-center lg:max-w-xl lg:text-start">
          <Badge className="inline-block text-xs text-primary rounded-2xl px-6 py-1.5 border border-primary bg-[#E5F6F2] font-medium">
            {/* Verified Local Talent • Secure Payments */}
            {tHero("badge")}
          </Badge>

          <h1 className="text-4xl font-bold leading-tight md:text-6xl">
            {/* Find Verified Skilled <br />
            taskers in <span className="text-primary">Ethiopia</span> */}
            {tHero("title")}
          </h1>

          <p className="text-lg text-[#343841] md:text-xl">
            {/* Connect with the top 1% of service professionals in minutes.
            AI-powered matching with secure escrow protection. */}
             {tHero("description")}
          </p>
          {/* search bar */}
          {/* <div className="py-8">
             <SearchBar/>
          </div> */}
         
        </div>

        {/* RIGHT CARDS */}
        <div className="hidden lg:flex flex-col space-y-6">
          {taskers.map((tasker, index) => (
            <Card
              key={tasker.id}
              className={`w-84 rounded-2xl border border-emerald-100/80 bg-white/90 p-4 shadow-xl shadow-emerald-100/60 backdrop-blur transform transition duration-300 ${offsets[index]}`}
            >
              <div className="flex gap-4">
                <Image
                  src={tasker.avatar}
                  width={56}
                  height={56}
                  alt={tasker.name}
                  className="rounded-full object-cover ring-2 ring-emerald-100"
                />

                <div className="flex-1">
                  <div className="flex justify-between w-full">
                    <p className="font-medium text-base">{tasker.name}</p>
                    <Badge variant={"secondary"} className="text-xs border border-neutral-400 py-0.5 rounded-2xl px-3 font-medium">
                      verified
                    </Badge>
                  </div>

                  <p className="text-xs font-semibold text-neutral-700">
                    {tasker.role}
                  </p>

                  <div className="mt-1 flex items-center text-xs gap-4">
                    <div className="flex items-center gap-1 font-medium">
                      <Star size={12} />
                      {tasker.rating}
                    </div>
                    <span className="text-neutral-700">
                      · {tasker.jobs} Jobs Done
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

      </div>
          <div className="flex items-center justify-center py-14 md:py-20">
             <SearchBar/>
          </div>
    </section>
  )
}

