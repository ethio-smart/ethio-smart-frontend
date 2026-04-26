
"use client"

import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import ServiceCategoryCard from "../cards/ServiceCategoryCard"

import {
  Wrench,
  Zap,
  BookMinus,
  BrushCleaning,
  Baby,
  Scissors,
  ChevronRight,
  LucideIcon,
} from "lucide-react"

import { useAppSelector } from "@/app/hooks/hooks"


// Stronger normalization 
const normalizeCategory = (name: string) =>
  name.toLowerCase().replace(/\s+/g, "")


//  icon map 
const categoryIcons: Record<string, LucideIcon> = {
  plumbing: Wrench,
  electrical: Zap,
  tutoring: BookMinus,
  cleaning: BrushCleaning,
  babysitter: Baby,
  hairdresser: Scissors,
}


function ServiceCategories() {
  const { categories, loading } = useAppSelector((state) => state.category)

  return (
    <section id="categories" className="bg-secondary w-full py-20">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-14">
          <div className="space-y-7">
            <h2 className="text-4xl font-bold text-gray-900">
              Explore Service Categories
            </h2>

            <p className="text-[#343841] max-w-xl">
              Whatever the project, we have the right expert for you.
            </p>
          </div>

          <Button
            variant="outline"
            className="rounded-md font-semibold py-6 text-primary border-primary hover:bg-primary hover:text-white transition"
          >
            View All Categories
            <ChevronRight />
          </Button>
        </div>

        {/* Grid */}
        <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">

          {/* Loading state */}
          {loading &&
            Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="flex flex-col items-center justify-center p-6 rounded-lg bg-gray-100 border space-y-4"
              >
                <Skeleton className="h-10 w-10 rounded-md" />
                <Skeleton className="h-4 w-24" />
              </div>
            ))}

          {/* Data */}
          {!loading &&
            categories.map((category) => {
              const key = normalizeCategory(category.name)
              const Icon = categoryIcons[key]

              return (
                <ServiceCategoryCard
                  key={category.id}
                  name={category.name}
                  categoryId={category.id}
                  icon={Icon}
                  bgColor="#f3f4f6"
                />
              )
            })}
        </div>
      </div>
    </section>
  )
}

export default ServiceCategories