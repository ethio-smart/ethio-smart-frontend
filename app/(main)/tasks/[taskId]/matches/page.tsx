'use client'

import FilterSidebar from "@/app/components/matches/FliterSidebar"
import MatchesHeader from "@/app/components/matches/MatchesHeader"
import WorkerCard from "@/app/components/matches/TaskerCard"

const workers = [
  {
    id: 1,
    name: "Dawit Mekonnen",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    match: 98,
    location: "Addis Ababa",
    experience: "12 Years exp",
    rating: 4.9,
    reviews: 124,
    description:
      "Master plumber specializing in complex residential leaks and high-end bathroom installations.",
    priceRange: "600 – 1,200 ETB",
    hourly: " 450 ETB/hr",
  },
  {
    id: 2,
    name: "Selamawit Tadesse",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    match: 94,
    location: "Addis Ababa",
    experience: "8 Years exp",
    rating: 4.8,
    reviews: 89,
    description:
      "Certified electrical technician handling full house wiring and circuit troubleshooting.",
    priceRange: "500 – 1,000 ETB",
    hourly: " 400 ETB/hr",
  },
  {
    id: 3,
    name: "Jenny Jenny",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    match: 94,
    location: "Addis Ababa",
    experience: "8 Years exp",
    rating: 4.8,
    reviews: 89,
    description:
      "Certified electrical technician handling full house wiring and circuit troubleshooting.",
    priceRange: "500 – 1,000 ETB",
    hourly: " 400 ETB/hr",
  },
]

export default function page() {
  return (
    <>
    
    <div className="min-h-screen bg-[#F9FAFB]">
      <MatchesHeader/>

      <div className="max-w-6xl mx-auto px-4 py-10 grid  grid-cols-[280px_1fr]  gap-8">
        <div>
          <FilterSidebar/>
        </div>

        <div className="space-y-6 bg-whit shadow-l rounded-2x ">
          {workers.map((worker) => (
            <WorkerCard key={worker.id} worker={worker} />
          ))}
        </div>
      </div>
    </div>
    </>
  )
}