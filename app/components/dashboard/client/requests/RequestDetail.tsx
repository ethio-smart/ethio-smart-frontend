import { Button } from "@/components/ui/button";
import { FileText, MessageSquare, Star } from "lucide-react";
import Image from "next/image";


export default function RequestDetails() {
  return (
    <div className="bg-whit p-s rounded-lg  space-y-4">
      <div className="flex items-center shadow space-x-4 bg-white p-4 rounded-lg" >
        
        <Image src={'/profile.png'} alt="Alex Rivera" height={36} width={36} className="size-20 border-2 border-primary aspect-square object-cover rounded-md"/>
        <div>
          <h3 className="font-semibold text-lg">Alex Rivera</h3>
          <p className="text-gray-500 text-sm">Professional Plumber · 8 years experience</p>
          <p className="text-yellow-500 font-mediu text-sm flex items-center gap-2"><Star size={15}/> 4.9 (128 reviews)</p>
        </div>
        <Button variant="outline" className="ml-auto"><MessageSquare size={18}/> Message</Button>
      </div>

      <div className=" bg-white p-4 rounded-lg shadow space-y-8">
        <h1 className="font-bold text-xl flex items-center gap-2">
            <span><FileText size={19} className="text-primary"/></span>
            <p>Service Details </p>
          
        </h1>
        <div className=" flex gap-10">
            <span className="text-[#D0D9E4]"> Description</span>
            <p className="text-sm">Fixing a major leaking pipe under the kitchen sink and replacing the main shut-off valve. Water pressure needs to be re-calibrated after installation.</p>
        </div>
        <p className="flex gap-10 text-sm"><span className="font-semibold  text-[#D0D9E4]">Scheduled Date</span> October 25, 2023 at 10:00 AM</p>
        <p className="flex gap-10 text-sm"><span className="font-semibold text-[#D0D9E4]">Location</span> 123 Maple Avenue, Springfield, IL 62704</p>
        <div className="bg-gray-100 h-40 flex items-center justify-center rounded-md">Map Placeholder</div>
      </div>
    </div>
  )
}