import { MessageSquare, BadgeCheck, ShieldCheck, UserCheck, Settings, CheckCircle, DollarSign } from "lucide-react"
import HowItWorksCard from "../cards/HowItworksCard"
import { Button } from "@/components/ui/button"
import BecomeTaskerModal from "../modal/BecometaskerModal"

import { useTranslations } from "next-intl"



function HowItWorks() {
  const t = useTranslations()

  const clientSteps = t.raw('process.client.steps')
  const taskerSteps = t.raw('process.tasker.steps')

  const clientIcons = [MessageSquare, BadgeCheck, ShieldCheck]
  const taskerIcons = [UserCheck, Settings, MessageSquare, CheckCircle, DollarSign]

  return (
    <section className="py-20 bg-[#F9FAFB]" id="how-it-work">
      <div className="max-w-7xl mx-auto px-6 text-center space-y-4">

        <span className="inline-block bg-secondary text-primary text-sm font-medium px-4 py-1 rounded-full">
          {t('process.badge')}
        </span>

        <h2 className="text-4xl font-bold mb-4">
          {t('process.title')}
        </h2>

        <p className="text-gray-600 max-w-2xl mx-auto mb-16">
          {t('process.description')}
        </p>

        {/* Client */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="w-fit bg-secondary text-primary text-2xl font-bold px-4 py-1 rounded-full">
              {t('process.client.title')}
            </h3>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {clientSteps.map((item: any, index: number) => (
              <HowItWorksCard
                key={index}
                title={item.title}
                description={item.description}
                icon={clientIcons[index]}
              />
            ))}
          </div>
        </div>

        {/* Tasker */}
        <div>
          <div className="text-center mb-12">
            <h3 className="w-fit bg-secondary text-primary text-2xl font-bold px-4 py-1 rounded-full mb-4">
              {t('process.tasker.title')}
            </h3>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {taskerSteps.map((item: any, index: number) => (
              <HowItWorksCard
                key={index}
                title={item.title}
                description={item.description}
                icon={taskerIcons[index]}
              />
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
          <BecomeTaskerModal>
            <Button className="px-8 py-5 bg-primary text-white hover:bg-primary/80">
              {t('process.cta.title')}
            </Button>
          </BecomeTaskerModal>

          <p className="text-gray-600 mt-4 text-sm">
            {t('process.cta.description')}
          </p>
        </div>

      </div>
    </section>
  )
}
export default HowItWorks