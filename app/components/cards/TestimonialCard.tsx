import Image from "next/image"
import { Star } from "lucide-react"

type TestimonialCardProps = {
  rating: number
  content: string
  name: string
  role: string
  location: string
  image: string
}

function TestimonialCard({
  rating,
  content,
  name,
  role,
  location,
  image,
}: TestimonialCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-xs p-8 space-y-5 flex flex-col justify-between h-77.5 w-90">
      <div className="flex gap-1 ">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${
              i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
            }`}
          />
        ))}
      </div>

      {/* text */}
      <p className="text-gray-600 text-base leading-relaxed  italic">
        &quot;{content}&quot;
      </p>
      <div className="h-px bg-gray-200 " />
{/* profile */}
      <div className="flex items-center gap-4">
        <Image
          src={image}
          alt={name}
          width={48}
          height={48}
          className="rounded-full size-14 object-cover"
        />
        <div>
          <h4 className="font-semibold text-gray-900 text-base">{name}</h4>
          <p className="text-sm text-gray-500">
            {role} • {location}
          </p>
        </div>
      </div>
    </div>
  )
}

export default TestimonialCard