"use client"

import { Gift, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import BecomeTaskerModal from "../modal/BecometaskerModal"

export default function BecomeTaskerSection() {
  return (
    <section className="w-full px-6 py-16 bg-[#F9FAFB]">
      <div className="max-w-7xl mx-auto">
        <div className="relative overflow-hidden rounded-[32px] bg-linear-to-r from-primary to-emerald-600 px-10 py-14 md:px-16 md:py-20">

          <div className="grid md:grid-cols-2 gap-12 items-center">

            {/* Left */}
            <div className="text-white space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                Monetize Your Skills <br /> Today.
              </h2>

              <p className="text-white/90 text-lg max-w-xl">
                Are you a skilled pro? Join Ethiopia&apos;s most prestigious service
                network. Get access to high-paying clients and grow your
                business with secure payments.
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <div className="flex items-center gap-3 bg-white/10 border border-white/20 backdrop-blur-sm px-5 py-3 rounded-xl">
                  <Gift size={18} />
                  <span className="text-sm font-medium">
                    15,000+ Active Clients
                  </span>
                </div>

                <div className="flex items-center gap-3 bg-white/10 border border-white/20 backdrop-blur-sm px-5 py-3 rounded-xl">
                  <Shield size={18} />
                  <span className="text-sm font-medium">
                    Guaranteed Payments
                  </span>
                </div>
              </div>
            </div>

            {/* Right */}
            <div className="flex flex-col items-start md:items-center md:justify-center space-y-4">

              {/* Modal Trigger */}
              <BecomeTaskerModal>
                <Button className="bg-white text-primary font-semibold text-lg px-15 py-7 rounded-lg shadow-lg hover:bg-white hover:shadow transition">
                  Become a tasker
                </Button>
              </BecomeTaskerModal>

              {/* Info below the button */}
              <div className="text-sm text-white/80 text-left md:text-center">
                <p className="font-medium">AI-Powered tasker Matching</p>
                <p className="text-white/70">
                  Find verified professionals faster and smarter
                </p>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  )
}