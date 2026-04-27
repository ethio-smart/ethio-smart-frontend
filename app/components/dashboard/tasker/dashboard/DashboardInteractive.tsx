"use client";

import { useState, useEffect } from "react";


import Icon from "@/components/ui/AppIcon";
import KPICards from "./KPICards";

import BookingPipeline from "./BookingPipeline";




export default function DashboardInteractive() {
  const [isHydrated, setIsHydrated] = useState(false);


  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-full border-4 border-primary border-t-transparent animate-spin" />
          <p className="text-sm text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

 

  return (
    <div className="min-h-screen bg-backgroun">
    
      <main
        id="main-content"
        className={`pt- transition-all duration-[250ms] ease-out`}
      >
        <div className="p-4 lg:p-4 space-y-5  mx-auto">
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h1 className="text-xl font-bold text-foreground font-heading">
                Dashboard Overview
              </h1>
              <p className="text-sm text-muted-foreground mt-0.5">
                Welcome back,  Here&apos;s how your business is performing.
              </p>
            </div>
            <div className="flex items-center gap-2">
              
              <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-secondary transition-standard press-effect shadow-warm-sm">
                <Icon name="DocumentChartBarIcon" size={15} variant="outline" />
                <span className="hidden sm:inline">Full Report</span>
              </button>
            </div>
          </div>

          {/* KPI Cards */}
          <KPICards />

          {/* Main Content Grid */}
          {/* <div className=" xl:grid-cols-12 gap-5"> */}
            

  
            <div className="xl:col-span-4 space-y-5">
              <BookingPipeline />
            </div>
          {/* </div> */}

          {/* Footer */}
          <div className="flex items-center justify-between pt-2 pb-4 border-t border-border">
            <p className="text-xs text-muted-foreground">
              &copy; {new Date()?.getFullYear()} TaskrMetrics. All rights
              reserved.
            </p>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-xs text-muted-foreground">
                All systems operational
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

