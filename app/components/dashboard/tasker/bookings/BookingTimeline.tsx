"use client";

import * as React from "react";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

export type BookingTimelineProps = {
  steps: readonly string[];
  currentStep: number; // -1 means unknown/not started
  className?: string;
};

export const BookingTimeline = React.memo(
  ({ steps, currentStep, className }: BookingTimelineProps) => {
    return (
      <div className={cn("flex items-center gap-0", className)}>
        {steps.map((step, idx) => {
          const isCompleted = currentStep >= 0 && idx <= currentStep;
          const isConnectorCompleted = currentStep >= 0 && idx < currentStep;

          return (
            <div key={step} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold",
                    isCompleted
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  {isCompleted ? <Check className="h-3 w-3" /> : idx + 1}
                </div>
                <p className="text-xs text-muted-foreground mt-1 whitespace-nowrap">
                  {step}
                </p>
              </div>
              {idx < steps.length - 1 && (
                <div
                  className={cn(
                    "flex-1 h-0.5 mx-1 mb-4",
                    isConnectorCompleted ? "bg-primary" : "bg-border"
                  )}
                />
              )}
            </div>
          );
        })}
      </div>
    );
  }
);
BookingTimeline.displayName = "BookingTimeline";

