"use client"

import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import ServiceCategoryCard from "../cards/ServiceCategoryCard"
import { BookMinus, BrushCleaning, ChevronRight } from "lucide-react"

import {
  Wrench,
  Zap,
  Sparkles,
  Laptop,
  Hammer,
  Paintbrush,
  Smartphone,
  ChefHat,
} from "lucide-react"


import { useAppSelector } from "@/app/hooks/hooks"


const categoryIcons: Record<string, JSX.Element> = {
  plumbing: <Wrench className="w-6 h-6 text-primary" />,
  electrical: <Zap className="w-6 h-6 text-primary" />,
  tutoring: <BookMinus className="w-6 h-6 text-primary" />,
  cleaning: <BrushCleaning  className="w-6 h-6 text-primary" />,
  it: <Laptop className="w-6 h-6 text-primary" />,
  carpentry: <Hammer className="w-6 h-6 text-primary" />,
  painting: <Paintbrush className="w-6 h-6 text-primary" />,
  gadget: <Smartphone className="w-6 h-6 text-primary" />,
  catering: <ChefHat className="w-6 h-6 text-primary" />,
}

function ServiceCategories() {
 
  const { categories, loading } = useAppSelector((state) => state.category);

  return (
    <section id="categories" className="bg-secondary w-full py-20">
      <div className="max-w-7xl mx-auto px-6">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-14">
          <div className="space-y-7">
            <h2 className="text-4xl font-bold text-gray-900">
              Explore Service Categories
            </h2>

            <p className="text-[#343841] max-w-xl">
              Whatever the project, we have the right expert for you.
              All professionals are vetted for quality and reliability.
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

        <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">

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

          {!loading &&
            categories.map((category) => (
              <ServiceCategoryCard
                key={category.id}
                name={category.name}
                categoryId={category.id}
                icon={
                  categoryIcons[category.name.toLowerCase()] 
                  // || (
                    // <Sparkles className="w-6 h-6 text-primary" />
                  // )
                }
                bgColor="bg-secondary"
              />
            ))}
        </div>
      </div>
    </section>
  )
}

export default ServiceCategories