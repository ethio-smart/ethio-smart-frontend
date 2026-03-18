// import AboutUs from "./components/AboutUs";
// import BecomeTaskerSection from "./components/BecomeTaskerSection";
// import FAQ from "./components/FAQ";
// import Hero from "./components/Hero";
// import HowItWorks from "./components/HowItworks";
// import ServiceCategories from "./components/ServiceCategories";
// import StatsBar from "./components/StatsBar";
// import Testimonial from "./components/Testimonial";

import MainLayout from "./(main)/layout"
import Home from "./(main)/page"



// export default function Home() {
//   return (
//     <div className="text-xl w-full min-h-screen bg-white">
    
//          <Hero/> 
//          <StatsBar/>
//          <div className="h-px mt-5 bg-neutral-200"></div>
//          {/* <hr  className="pt-10"/> */}
//          <HowItWorks/>
//          <ServiceCategories/>
//          <AboutUs/>
//          <Testimonial/>
//          <BecomeTaskerSection/>
//          <FAQ/>
      
//     </div>
//   );
// }


function page() {
  return (
    <div>
      <MainLayout>
        <Home/>
      </MainLayout>
    </div>
  )
}

export default page