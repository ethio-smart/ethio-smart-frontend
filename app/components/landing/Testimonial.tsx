import TestimonialCard from "../cards/TestimonialCard"

const testimonials = [
  {
    rating: 5,
    content:
      "Managing multiple apartments in Bole became so much easier. I can find reliable plumbers and electricians in minutes. The escrow system is a game-changer.",
    name: "Helen Mersha",
    role: "Property Manager",
    location: "Addis Ababa",
    image: "/profile.png",
  },
  {
    rating: 4,
    content:
      "Found a specialized IT technician to set up our office network. The quality of work was outstanding and the matching process was surprisingly fast.",
    name: "Tewodros Kassahun",
    role: "Startup Founder",
    location: "Adama",
    image: "/profile.png",
  },
  {
    rating: 5,
    content:
      "I was hesitant at first, but the worker verification gave me confidence. The gardener I hired was professional and did an excellent job on our lawn.",
    name: "Saba Girmay",
    role: "Homeowner",
    location: "Bahir Dar",
    image: "/profile.png",
  },
  {
    rating: 2,
    content:
      "I was hesitant at first, but the worker verification gave me confidence. The gardener I hired was professional and did an excellent job on our lawn.",
    name: "Saba Girmay",
    role: "Homeowner",
    location: "Bahir Dar",
    image: "/profile.png",
  },
  {
    rating: 5,
    content:
      "I was hesitant at first, but the worker verification gave me confidence. The gardener I hired was professional and did an excellent job on our lawn.",
    name: "Saba Girmay",
    role: "Homeowner",
    location: "Bahir Dar",
    image: "/profile.png",
  },
]

function Testimonial() {
  return (
    <section className="bg-secondary py-20">
      <div className="max-w-7xl mx-auto px-6 space-y-10">
        {/* texts */}
        <div className="text-center  max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            What Our Users Say
          </h2>
          <p className="text-gray-600 text-lg">
            Join thousands of happy customers and professionals who are
            transforming how work gets done in Ethiopia.
          </p>
        </div>

        {/* Cards */}
         
        <div className="flex gap-8 overflow-x-auto scroll-smooth w-full scrollbar-hide  snap-x snap-mandatory max-w-6xl ">
          {testimonials.map((item, index) => (
             <div className="w-full snap-start" key={index}>
            <TestimonialCard key={index} {...item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonial