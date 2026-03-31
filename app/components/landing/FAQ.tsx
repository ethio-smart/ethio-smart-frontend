"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
export const faqs = [
  {
    question: "How does Ethio-Smart ServiceLink match me with the right tasker?",
    answer:
      "We use AI-powered semantic matching to analyze your task description, location, budget, and required skills. The system compares this with verified tasker profiles, experience history, and ratings to suggest the most suitable professionals."
  },
  {
    question: "Is my payment secure?",
    answer:
      "Yes. Payments are held securely in escrow until the task is completed and approved. This protects both clients and taskers by ensuring fairness and accountability."
  },
  {
    question: "Can I chat with a tasker before making payment?",
    answer:
      "Yes, limited in-app messaging is available to clarify task details before confirmation. Contact details are hidden to maintain platform safety and prevent off-platform transactions."
  },
  {
    question: "What happens if I’m not satisfied with the service?",
    answer:
      "If issues arise, you can request revisions or open a dispute. Our system reviews the case and ensures a fair resolution before releasing payment."
  },
  {
    question: "Are taskers verified?",
    answer:
      "Yes. taskers go through identity verification and profile review before they can accept tasks. Ratings and reviews further ensure quality and trust."
  }
]
function FAQ() {
  return (
    <div className='flex items-center justify-center bg-[#F9FAFB]'>
   <div className="max-w-4x mx-aut space-y-7">
    <p className="text-4xl leading-1 font-medium">Frequently Asked Question</p>
    <Accordion
      type="single"
      collapsible
      defaultValue="shipping"
      className="max-w-lg space-y-4"
    
      >
      {faqs.map((faq,i)=>(
     
      <AccordionItem className="bg-white rounded-md py-2 px-4 shadow-2xs"  value={`item-${i}`}  key={i}>
        <AccordionTrigger>{faq.question}</AccordionTrigger>
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