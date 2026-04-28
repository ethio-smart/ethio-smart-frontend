"use client";
import { Search, MapPin, Mic, Loader2 } from "lucide-react";
import { useMemo, useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import { locations } from "@/app/utils/constant";
import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useLocale, useTranslations } from "next-intl";
import { searchTaskers } from "@/app/store/slices/searchSlice";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const { categories, selectedCategory } = useAppSelector(
    (state) => state.category
  );
  const { loading, error, results } = useAppSelector(
    (state) => state.search
  );
  console.log('result', results)

  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [locationOpen, setLocationOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const locale = useLocale();
  const dispatch = useAppDispatch();
  const t = useTranslations("searchBar");
  const router = useRouter()

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  // sync voice → search (important fix)
  useEffect(() => {
    if (listening && transcript) {
      setSearch(transcript);
    }
  }, [transcript, listening]);

  if (!browserSupportsSpeechRecognition) {
    console.warn("Speech recognition not supported");
  }

  // language mapping
  const mapLanguageToBackend = (locale: string): string => {
    switch (locale) {
      case "am":
        return "am";
      case "om":
        return "om";
      default:
        return "en";
    }
  };

  const originalLanguage = mapLanguageToBackend(locale);

  // start voice
  const startVoice = () => {
    
    SpeechRecognition.startListening({
      continuous: true,
      language:
        locale === "am"
          ? "am-ET"
          : locale === "om"
          ? "om-ET"
          : "en-US",
    });
  };

  // stop voice
  const stopVoice = () => {
    SpeechRecognition.stopListening();

    if (transcript?.trim()) {
      // setSearch(transcript);
      setSearch((prev) => prev + " " + transcript);
    }

    resetTranscript();
  };

  // reset everything
  const handleReset = () => {
    setSearch("");
    resetTranscript();
  };

  // search submit
  const handleSearchSubmit = async() => {
    if (!search.trim()) return;

    await dispatch(
      searchTaskers({
        query: search,
        originalLanguage,
      })
    );
    // router.push(`${locale}/search`)
    router.push(`/${locale}/search?query=${encodeURIComponent(search)}`)
  };

  // handle search input change with typing indicator
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setIsTyping(true);
    
    // Clear typing indicator after user stops typing
    const timeoutId = setTimeout(() => {
      setIsTyping(false);
    }, 500);
    
    return () => clearTimeout(timeoutId);
  };

  // handle search input focus
  const handleSearchFocus = () => {
    setIsFocused(true);
    // Clear focus indicator after a short delay
    const timeoutId = setTimeout(() => {
      setIsFocused(false);
    }, 1000);
    
    return () => clearTimeout(timeoutId);
  };

  // filter locations
  const filteredLocations = useMemo(
    () =>
      locations.filter((loc) =>
        loc.toLowerCase().includes(location.toLowerCase())
      ),
    [location]
  );

  // Determine if we should show loading state
  const showLoading = loading || isTyping || isFocused;

  return (
    <section className="w-full px-4">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSearchSubmit();
        }}
      >
        <div className="w-full max-w-4xl mx-auto p-2 rounded-2xl bg-background/80 backdrop-blur border shadow-lg flex flex-col sm:flex-row items-stretch gap-2 sm:gap-0">

          {/* SEARCH INPUT */}
          <div className="relative flex-1">
            {showLoading ? (
              <Loader2 className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-primary animate-spin" />
            ) : (
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            )}

            <Input
              value={search}
              onChange={handleSearchChange}
              onFocus={handleSearchFocus}
              placeholder={t("placeholder")}
              className={`pl-10 pr-20 border-0 shadow-none focus-visible:ring-0 py-5 sm:py-7 ${showLoading ? 'text-muted-foreground' : ''}`}
            />

            {/* RESET ICON */}
            {search && !loading && (
              <button
                type="button"
                onClick={handleReset}
                className="absolute right-10 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-red-500 text-sm"
              >
                ✕
              </button>
            )}

            {/* MIC BUTTON */}
            <button
              type="button"
              onClick={listening ? stopVoice : startVoice}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              <Mic
                className={`h-5 w-5 transition ${
                  listening
                    ? "text-primary animate-pulse"
                    : "text-muted-foreground"
                }`}
              />
            </button>
          </div>

          {/* DIVIDER */}
          <div className="hidden sm:block w-px bg-border" />

          {/* LOCATION */}
          {/* <div className="relative">
            <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            <Input
           
              value={location}
              onChange={(e) => {
                setLocation(e.target.value);
                setLocationOpen(true);
              }}
              onFocus={() => setLocationOpen(true)}
              placeholder={t("locationPlaceholder")}
              className="pl-9 border-0 shadow-none focus-visible:ring-0 py-5 sm:py-7"
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
          </div> */}

          {/* BUTTON */}
          <Button
            type="submit"
            className="w-full sm:w-auto px-8 py-5 sm:py-7 rounded-none sm:rounded-r-lg"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                {t("button")}
              </>
            ) : (
              t("button")
            )}
          </Button>
        </div>
      </form>

      {/* CATEGORIES */}
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