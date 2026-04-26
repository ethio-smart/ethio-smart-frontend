'use client '
import Hero from "@/app/components/landing/Hero"
import StatsBar from "@/app/components/landing/StatsBar"

import ServiceCategories from "@/app/components/landing/ServiceCategories"
import Testimonial from "@/app/components/landing/Testimonial"
import BecomeTaskerSection from "@/app/components/landing/BecomeTaskerSection"
import FAQ from "@/app/components/landing/FAQ"
import AboutUs from "@/app/components/landing/AboutUs";
import HowItWorks from "@/app/components/landing/HowItworks"



export default function Home() {
  return (
    <div className="text-xl w-full min-h-screen bg-white">
         <Hero/> 
         <StatsBar/>
         <div className="h-px mt-5 bg-neutral-200"></div>
         {/* <hr  className="pt-10"/> */}
         <HowItWorks/>
         <ServiceCategories/>
         <AboutUs/>
         <Testimonial/>
         <BecomeTaskerSection/>
         <FAQ/>
      
    </div>
  );
}
