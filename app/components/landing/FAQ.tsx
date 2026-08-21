

"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useTranslations } from "next-intl"

function FAQ() {
  const t = useTranslations("faq")
  const faqs = t.raw("items")

  return (
    <div className="flex items-center justify-center bg-[#F9FAFB] py-20">
      <div className="max-w-2xl w-full space-y-10 px-6">

        <h2 className="text-4xl font-bold text-center">
          {t("title")}
        </h2>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq: any, i: number) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="bg-white rounded-md py-2 px-4 shadow-sm"
            >
              <AccordionTrigger>
                {faq.question}
              </AccordionTrigger>

              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

      </div>
    </div>
  )
}

export default FAQ