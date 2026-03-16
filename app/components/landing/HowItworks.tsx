import { MessageSquare, BadgeCheck, ShieldCheck } from "lucide-react"
import HowItWorksCard from "../cards/HowItworksCard"



const steps = [
  {
    title: "Describe Your Need",
    description:
      "Tell us what you need. We match you with verified professionals instantly.",
    icon: MessageSquare,
  },
  {
    title: "Review & Select",
    description:
      "Compare profiles, ratings, and pricing. Choose the right professional with confidence.",
    icon: BadgeCheck,
  },
  {
    title: "Secure Payment",
    description:
      "Pay safely through escrow. Funds are released only after approval.",
    icon: ShieldCheck,
  },
]



function HowItWorks() {
  return (
    <section className="py-20 bg-[#F9FAFB]" id="how-it-work">
      <div className="max-w-6xl mx-auto px-6 text-center space-y-4">
        <span className="inline-block bg-secondary text-primary text-sm font-medium px-4 py-1 rounded-full ">
          The Process
        </span>

        <h2 className="text-4xl font-bold mb-4">
          How ServiceLink Works
        </h2>

        <p className="text-gray-600 max-w-2xl mx-auto mb-16">
          We've simplified the process of finding and hiring skilled labor.
          Three simple steps to get your job done.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((item,index) => (
            <HowItWorksCard
              key={index} 
              title={item.title}
              description={item.description}
              icon={item.icon}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
