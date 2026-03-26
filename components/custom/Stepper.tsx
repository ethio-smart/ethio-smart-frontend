"use client"

import { cn } from "@/lib/utils"

type Step = {
  label: string
}

type StepperProps = {
  steps: Step[]
  currentStep: number
}

export function Stepper({ steps, currentStep }: StepperProps) {
  return (
    <div className="w-full ">
      <div className="flex 4 items-center justify-between">
        {steps.map((step, index) => {
          const isActive = index === currentStep
          const isCompleted = index < currentStep

          return (
            <div key={index} className="flex items-center flex-1">
              {/* Step Circle */}
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium border",
                    isActive && "bg-primary text-white ",
                    isCompleted && "bg-primary text-white border-green-500",
                    !isActive && !isCompleted && "bg-white text-gray-400 border-gray-300"
                  )}
                >
                  {isCompleted ? "✓" : index + 1}
                </div>

                {/* Label */}
                <span className="mt-2 text-xs text-center text-gray-600">
                  {step.label}
                </span>
              </div>

              {/* Connector Line */}
              {index !== steps.length - 1 && (
                <div
                  className={cn(
                    "flex-1 h-[2px] mx-2 w-74",
                    isCompleted ? "bg-primary" : "bg-gray-300"
                  )}
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}