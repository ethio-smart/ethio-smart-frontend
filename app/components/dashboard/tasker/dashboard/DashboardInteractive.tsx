"use client";

import { useState, useEffect } from "react";


import Icon from "@/components/ui/AppIcon";
import KPICards from "./KPICards";
import EarningsChart from "./EarningsChart";
import BookingPipeline from "./BookingPipeline";

import RecentActivity from "./RecentActivity";


export default function DashboardInteractive() {
  const [isHydrated, setIsHydrated] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  const sidebarWidth = isSidebarCollapsed ? "lg:pl-" : "lg:pl-[0px]";

  return (
    <div className="min-h-screen bg-backgroun">
    
      <main
        id="main-content"
        className={`pt- transition-all duration-[250ms] ease-out ${sidebarWidth}`}
      >
        <div className="p-4 lg:p-4 space-y-5  mx-auto">
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h1 className="text-xl font-bold text-foreground font-heading">
                Dashboard Overview
              </h1>
              <p className="text-sm text-muted-foreground mt-0.5">
                Welcome back, Alex! Here&apos;s how your business is performing.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border text-sm text-foreground hover:bg-muted transition-standard press-effect">
                <Icon name="ArrowDownTrayIcon" size={15} variant="outline" />
                <span className="hidden sm:inline">Export CSV</span>
              </button>
              <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-secondary transition-standard press-effect shadow-warm-sm">
                <Icon name="DocumentChartBarIcon" size={15} variant="outline" />
                <span className="hidden sm:inline">Full Report</span>
              </button>
            </div>
          </div>

          {/* KPI Cards */}
          <KPICards />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-5">
            {/* Left: Charts (8 cols) */}
            <div className="xl:col-span-8 space-y-5">
              <EarningsChart />
            </div>

            {/* Right: Sidebar (4 cols) */}
            <div className="xl:col-span-4 space-y-5">
              <BookingPipeline />
            </div>
          </div>

          {/* Bottom Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-5">
            {/* <TopServices /> */}
            <RecentActivity />
          </div>

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

