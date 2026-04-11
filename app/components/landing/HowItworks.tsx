import { MessageSquare, BadgeCheck, ShieldCheck, UserCheck, Settings, CheckCircle, DollarSign } from "lucide-react"
import HowItWorksCard from "../cards/HowItworksCard"
import { Button } from "@/components/ui/button"

// Client flow steps
const clientSteps = [
  {
    title: "Describe Your Need",
    description: "Tell us what you need. We match you with verified professionals instantly.",
    icon: MessageSquare,
  },
  {
    title: "Review & Select",
    description: "Compare profiles, ratings, and pricing. Choose the right professional with confidence.",
    icon: BadgeCheck,
  },
  {
    title: "Secure Payment",
    description: "Pay safely through escrow. Funds are released only after approval.",
    icon: ShieldCheck,
  },
]

// Tasker flow steps
const taskerSteps = [
  {
    title: "Apply to Become a Tasker",
    description: "Submit your profile, skills, and experience. Our team will review and verify your application.",
    icon: UserCheck,
  },
  {
    title: "Set Up Your Services",
    description: "Create your service offerings, set competitive prices, and define your availability.",
    icon: Settings,
  },
  {
    title: "Get Job Requests",
    description: "Receive personalized job requests that match your skills. Review and accept the right jobs.",
    icon: MessageSquare,
  },
  {
    title: "Complete the Work",
    description: "Deliver high-quality service professionally. Build your reputation with excellent ratings.",
    icon: CheckCircle,
  },
  {
    title: "Get Paid Securely",
    description: "Payments are held safely in escrow and released promptly once the client approves the job.",
    icon: DollarSign,
  },
]

function HowItWorks() {
  return (
    <section className="py-20 bg-[#F9FAFB]" id="how-it-work">
      <div className="max-w-7xl mx-auto px-6 text-center space-y-4">
        <span className="inline-block bg-secondary text-primary text-sm font-medium px-4 py-1 rounded-full">
          The Process
        </span>

        <h2 className="text-4xl font-bold mb-4">
          How ServiceLink Works
        </h2>

        <p className="text-gray-600 max-w-2xl mx-auto mb-16">
          We&apos;ve simplified the process for both clients and taskers. Choose your path to get started.
        </p>

        {/* Client Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="w-fit bg-secondary text-primary text-2xl font-bold px-4 py-1 rounded-full">For Clients</h3>
            <p className="text-gray-600 max-w-xl mx-auto">
              Get your tasks done in three simple steps with verified professionals
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {clientSteps.map((item, index) => (
              <HowItWorksCard
                key={`client-${index}`}
                title={item.title}
                description={item.description}
                icon={item.icon}
              />
            ))}
          </div>
        </div>

        {/* Tasker Section */}
        <div>
          <div className="text-center mb-12">
            <h3 className="w-fit bg-secondary text-primary text-2xl font-bold px-4 py-1 rounded-full mb-4">For Taskers</h3>
            <p className="text-gray-600 max-w-xl mx-auto">
              Start your journey as a professional service provider and earn on your terms
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 ">
            {taskerSteps.map((item, index) => (
              <div key={`tasker-${index}`} className="relative">
                <HowItWorksCard
                  title={item.title}
                  description={item.description}
                  icon={item.icon}
                />
                {index < taskerSteps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                    <div className="w-6 h-0.5 bg-gray-300"></div>
                    <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-gray-400 rounded-full"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <div className="inline-flex flex-col sm:flex-row gap-4">
           
            <Button className="px-8 py-5 bg-primary text-white  hover:bg-primary/80 transition-colors ">
              Become a Tasker
            </Button>
          </div>
          <p className="text-gray-600 mt-4 text-sm">
            Join thousands of satisfied clients and successful taskers
          </p>
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
