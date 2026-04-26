
"use client"

import Image from "next/image"
import {
  ShieldCheck,
  Sparkles,
  Shield,
  Star,
} from "lucide-react"
import AboutUsCard from "../cards/AboutUsCard"
import { useTranslations } from "next-intl"

export default function AboutUs() {
  const t = useTranslations("about")
  const features = t.raw("features")

  const icons = [Sparkles, ShieldCheck, Shield, Star]

  return (
    <section className="w-full py-20 bg-[#F9FAFB]">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">

        {/* LEFT */}
        <div className="space-y-8">
          <div className="text-center lg:text-left">
            <span className="bg-[#E6F1EF] text-primary text-sm px-4 py-1 rounded-full">
              {t("badge")}
            </span>

            <h2 className="text-5xl font-bold mt-4">
              {t("title")}
            </h2>

            <p className="text-[#343841] mt-4 leading-relaxed lg:max-w-xl">
              {t("description")}
            </p>
          </div>

          {/* CARDS */}
          <div className="grid sm:grid-cols-2 gap-6">
            {features.map((feature: any, index: number) => (
              <AboutUsCard
                key={index}
                icon={icons[index]}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative pt-10 rounded-3xl h-150 w-full overflow-hidden hidden lg:block">
          <Image
            src="/woman%20cleaning%20house.jpeg"
            alt="Premium standards"
            fill
            className="object-cover"
          />

          <div className="absolute left-5 top-5 h-28 w-28 overflow-hidden rounded-2xl border-4 border-white shadow-xl">
            <Image
              src="/teacher%20profile%20picture.jpg"
              alt="Professional tasker"
              fill
              className="object-cover"
            />
          </div>

          <div className="absolute right-5 top-20 h-24 w-24 overflow-hidden rounded-2xl border-4 border-white shadow-xl">
            <Image
              src="/profile%20picture.jpg"
              alt="Verified provider"
              fill
              className="object-cover"
            />
          </div>

          <div className="absolute inset-0 bg-linear-to-t from-emerald-700/80 to-transparent flex items-end p-10">
            <div className="bg-white space-y-2 rounded-2xl px-7 py-4">
              <p className="text-primary uppercase font-semibold">
                {t("missionLabel")}
              </p>
              <h3 className="text-2xl capitalize font-bold leading-snug">
                {t("missionText")}
              </h3>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}