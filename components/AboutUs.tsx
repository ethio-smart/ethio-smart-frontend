import Image from "next/image"
import {
  ShieldCheck,
  Sparkles,
  Shield,
  Star,
} from "lucide-react"
import AboutUsCard from "./AboutUsCard"

const features = [
  {
    title: "AI-Powered Matching",
    description:
      "Our proprietary algorithm connects you with the right specialist based on skill level, location proximity, and verified history.",
    icon: <Sparkles/>,
   
  },
  {
    title: "Verified Professionals",
    description:
      "Every worker undergoes a rigorous background check, including identity verification and skill assessment.",
    icon: <ShieldCheck/>,
    
  },
  {
    title: "Secure Escrow System",
    description:
      "Your payment is safely held in escrow and only released to the professional once you confirm the work is completed.",
    icon: <Shield/>,
   
  },
  {
    title: "Transparent Ratings",
    description:
      "Detailed reviews and public performance metrics ensure accountability and top-tier service for every client.",
    icon: <Star/>,
  
  },
];
export default function AboutUs() {
  return (
    <section className="w-full py-20 bg-[#F9FAFB]">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16   items-center">

        {/* LEFT SIDE */}
        <div className="space-y-8">
          <div className="text-center lg:text-left">
            <span className="bg-[#E6F1EF] text-primary text-sm px-4 py-1 rounded-full">
              Why Ethio-Smart?
            </span>

            <h2 className="text-5xl font-bold  mt-4">
              Security Built for Ethiopia
            </h2>

            <p className="text-[#343841]  mt-4 leading-relaxed lg:max-w-xl text-center">
              We are more than a listing site. We are a technical
              infrastructure that guarantees quality and safety
              for every household in the country.
            </p>
          </div>

          {/* CARDS  */}
          <div className="grid sm:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <AboutUsCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>

        {/* RIGHT SIDE IMAGE */}
        <div className="relative pt-10 rounded-3xl h-150 w-130 overflow-hidden hidden lg:block">
          <Image
            src="/profile.png"
            alt="Premium standards"
            width={200}
            height={100}
            className="object-cover w-full h-full"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-emerald-700/80 to-transparent flex items-end p-10">
            <div className="bg-white space-y-2 rounded-2xl px-7 py-4">
              <p className="text-primary uppercase font-semibold ">
                OUR MISSION
              </p>
              <h3 className="text-2xl capitalize font-bold leading-snug">
                Empowering local professional and simplifying life for client
              </h3>
             
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
