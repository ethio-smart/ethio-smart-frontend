"use client";
import { Search, MapPin } from "lucide-react";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";



const locations = [
  { value: "addis-ababa", label: "Addis Ababa" },
  { value: "adama", label: "Adama" },
  { value: "hawassa", label: "Hawassa" },
  { value: "bahir-dar", label: "Bahir Dar" },
  { value: "dire-dawa", label: "Dire Dawa" },
  { value: "mekelle", label: "Mekelle" },
  { value: "gondar", label: "Gondar" },
  { value: "jimma", label: "Jimma" },

];

const categories = [
  "Cleaning",
  "Moving",
  "Home Repair",
  "Tutoring",
  "Painting",
  "Maintenance",
  "Beauty & Personal Care",
  "Outdoor Help"
];
export default function SearchBar() {
 const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // const [selectedLocation, setSelectedLocation] = useState<
  //   (typeof locations)[number] | null
  // >(locations[0]); // default: Addis Ababa

  return (
  <section>
      <div
        className={"max-w-4xl  items-center flex flex-row justify-center sm:items-r border rounded-lg sm:rounded-md overflow-hidden bg-background transition-all duration-200"
        }
      >
        {/*  search input */}
           <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          <Input
            placeholder="What service do you need?"
            className="border-0 shadow-none pl-10 py-2 rounded-xl text-base placeholder:text-muted-foreground/70 focus-visible:ring-0"
          />
        </div>

        
        <div className="hidden sm:block h-8 w-px bg-border self-center" />

        <div className="relative flex items-center border-t sm:border-t-0 sm:border-l border-border">
          <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          <Input
            placeholder="Location"
            className="border-0 shadow-none pl-9 pr-4 py- w-32 text-base rounded-none focus-visible:ring-0"
          />
        </div>
        
        {/* Location picker */}
         {/* <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              role="combobox"
              aria-expanded={open}
              className={cn(
                "justify-between px-5 py-6 sm:py-0 h-auto sm:h-full",
                "text-base font-normal text-left sm:text-center",
                "border-t sm:border-t-0 border-border sm:border-l",
                "rounded-none hover:bg-accent/50",
                !selectedLocation && "text-muted-foreground"
              )}
            >
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 shrink-0 opacity-70" />
                {selectedLocation ? selectedLocation.label : "Select location..."}
              </div>
              <span className="sr-only">Toggle location menu</span>
            </Button>
          </PopoverTrigger>

          <PopoverContent className="w-(--radix-popover-trigger-width) p-0" align="start">
            <Command>
              <CommandInput placeholder="Search city or area..." />
              <CommandList>
                <CommandEmpty>No location found.</CommandEmpty>
                <CommandGroup>
                  {locations.map((loc) => (
                    <CommandItem
                      key={loc.value}
                      value={loc.value}
                      onSelect={() => {
                        setSelectedLocation(loc);
                        setOpen(false);
                      }}
                    >
                      {loc.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>  */}
        {/* Search button */}
        <Button
          className={"rounded-none  h-auto py-5 px-9 text-base font-medium"}>
          Search
        </Button>
      </div>
      <div className="flex flex-wrap gap-4 pt-4">
        {categories.map((category,index)=>(

     <button key={index}
      className={`text-sm rounded-full py-1 px-4 bg-neutral-200 ${selectedCategory === category ? 'bg-primary text-white':''}`}
        onClick={()=>setSelectedCategory(category)}
    >
      
      {category}</button>
        ))}
      </div>
      
      {/* <div className="flex flex-wrap gap-4 pt-4">
        {categories.map((category,index)=>(

   <button key={index}
    className={`text-sm rounded-full py-1 px-4 bg-neutral-200 ${selectedCategory === category ? 'bg-primary text-white':''}`}
   onClick={()=>setSelectedCategory(category)}
    >
      
      {category}</button>
        ))}
      </div> */}
      </section>
    
  );
}