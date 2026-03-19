
import AboutUs from "../components/landing/AboutUs";
import BecomeTaskerSection from "../components/landing/BecomeTaskerSection";

import Hero from "../components/landing/Hero";
import HowItWorks from "../components/landing/HowItworks";
import ServiceCategories from "../components/landing/ServiceCategories";
import StatsBar from "../components/landing/StatsBar";
import Testimonial from "../components/landing/Testimonial";
import FAQ from "../components/landing/FAQ";



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
