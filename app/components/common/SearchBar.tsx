

"use client";

import { Search, MapPin, Mic } from "lucide-react";
import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import { locations } from "@/app/utils/constant";
import { useAppSelector } from "@/app/hooks/hooks";

import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

export default function SearchBar() {
  const { categories, selectedCategory } = useAppSelector(
    (state) => state.category
  );

  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [locationOpen, setLocationOpen] = useState(false);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  //filter location
  const filteredLocations = useMemo(
    () =>
      locations.filter((loc) =>
        loc.toLowerCase().includes(location.toLowerCase())
      ),
    [location]
  );

  if (!browserSupportsSpeechRecognition) {
    console.warn("Speech recognition not supported");
  }

  //  Start voice
  const startVoice = () => {
    SpeechRecognition.startListening({
      continuous: true,
      language: "en-US",
    });
  };

  // Stop voice 
  const stopVoice = () => {
    SpeechRecognition.stopListening();

    if (transcript) {
      setSearch(transcript); 
    }

    resetTranscript();
  };

  return (
    <section className="w-full px-4">
      <div className="w-full max-w-4xl mx-auto flex items-center border rounded-lg bg-background">

        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />

          <Input
            value={listening ? transcript : search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="What service do you need?"
            className="pl-10 pr-10 border-0 shadow-none focus-visible:ring-0 py-7"
          />

          {/*  MIC BUTTON */}
          <button
            type="button"
            onClick={listening ? stopVoice : startVoice}
            className="absolute right-3 top-1/2 -translate-y-1/2"
          >
            <Mic
              className={`h-5 w-5 cursor-pointer transition ${
                listening ? "text-primary animate-pulse" : "text-muted-foreground"
              }`}
            />
          </button>
        </div>

        {/* Divider */}
        <div className="hidden sm:block h-8 w-px bg-border" />

        {/* Location */}
        <div className="relative w-56">
          <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            value={location}
            onChange={(e) => {
              setLocation(e.target.value);
              setLocationOpen(true);
            }}
            onFocus={() => setLocationOpen(true)}
            placeholder="Location"
            className="pl-9 border-0 shadow-none focus-visible:ring-0"
          />

          {locationOpen && (
            <div className="absolute left-0 top-full mt-1 w-full border rounded-md bg-white shadow-md z-50">
              <Command>
                <CommandGroup className="max-h-60 overflow-auto">
                  {filteredLocations.length > 0 ? (
                    filteredLocations.map((loc) => (
                      <CommandItem
                        key={loc}
                        value={loc}
                        onSelect={() => {
                          setLocation(loc);
                          setLocationOpen(false);
                        }}
                      >
                        {loc}
                      </CommandItem>
                    ))
                  ) : (
                    <div className="p-3 text-sm text-muted-foreground">
                      No results found
                    </div>
                  )}
                </CommandGroup>
              </Command>
            </div>
          )}
        </div>

        {/* Button */}
        <Button className="rounded-r-lg rounded-l-none px-8 py-7">
          Search
        </Button>
      </div>

      {/* Categories */}
      <div className="max-w-4xl mx-auto flex flex-wrap gap-3 pt-4">
        {categories.map((category, index) => (
          <button
            key={index}
            className={`text-sm rounded-full py-1 px-4 bg-neutral-200 transition ${
              selectedCategory === category ? "bg-primary text-white" : ""
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
    </section>
  );
}