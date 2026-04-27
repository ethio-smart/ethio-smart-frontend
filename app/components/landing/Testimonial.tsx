
import TestimonialCard from "../cards/TestimonialCard"
import { useTranslations } from "next-intl"

const testimonials = [
  {
    rating: 5,
    content:
      "Managing multiple apartments in Bole became so much easier. I can find reliable plumbers and electricians in minutes. The escrow system is a game-changer.",
    name: "Helen Mersha",
    role: "Property Manager",
    location: "Addis Ababa",
    image: "/teacher%20profile%20picture.jpg",
  },
  {
    rating: 4,
    content:
      "Found a specialized IT technician to set up our office network. The quality of work was outstanding and the matching process was surprisingly fast.",
    name: "Tewodros Kassahun",
    role: "Startup Founder",
    location: "Adama",
    image: "/men%20worker%20profile.jpg",
  },
  {
    rating: 5,
    content:
      "I was hesitant at first, but the tasker verification gave me confidence. The gardener I hired was professional and did an excellent job on our lawn.",
    name: "Saba Girmay",
    role: "Homeowner",
    location: "Bahir Dar",
    image: "/woman%20tutor.jpg",
  },
  {
    rating: 2,
    content:
      "I was hesitant at first, but the tasker verification gave me confidence. The gardener I hired was professional and did an excellent job on our lawn.",
    name: "Saba Girmay",
    role: "Homeowner",
    location: "Bahir Dar",
    image: "/profile%20picture.jpg",
  },
  {
    rating: 5,
    content:
      "I was hesitant at first, but the tasker verification gave me confidence. The gardener I hired was professional and did an excellent job on our lawn.",
    name: "Saba Girmay",
    role: "Homeowner",
    location: "Bahir Dar",
    image: "/women%20worker%20for%20profile.jpg",
  },
]

function Testimonial() {
  const t=useTranslations("testimonial")
  return (
    <section className="bg-[linear-gradient(180deg,#f5fbf9_0%,#eaf5f1_100%)] py-20">
      <div className="max-w-7xl mx-auto px-6 space-y-10">
        {/* texts */}
        <div className="text-center  max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
          
            {t("title")}
          </h2>
          <p className="text-gray-600 text-lg">
            
            {t("subtitle")}
          </p>
        </div>

        {/* Cards */}
         
        <div className="flex w-full max-w-6xl snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth scrollbar-hide md:gap-8">
          {testimonials.map((item, index) => (
             <div className="w-full min-w-70 snap-start md:min-w-90" key={index}>
            <TestimonialCard key={index} {...item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonial