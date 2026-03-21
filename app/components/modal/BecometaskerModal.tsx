"use client"

import { useState, useMemo } from "react"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select"
import { Command, CommandGroup, CommandItem } from "@/components/ui/command"
import { MapPin, FileText, Globe, Calendar } from "lucide-react"
import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks"
import { RootState } from "@/app/store/store"
import { createTasker } from "@/app/store/slices/taskerSlice"
import { toast } from "sonner"


/* locations dataset */
const locations = [
  "Addis Ketema, Addis Ababa",
  "Akaki Kality, Addis Ababa",
  "Arada, Addis Ababa",
  "Bole, Addis Ababa",
  "Gullele, Addis Ababa",
  "Kirkos, Addis Ababa",
  "Kolfe Keranio, Addis Ababa",
  "Lemi Kura, Addis Ababa",
  "Lideta, Addis Ababa",
  "Nifas Silk-Lafto, Addis Ababa",
  "Yeka, Addis Ababa",
  "Burayu, Sheger City",
  "Sebeta, Sheger City",
  "Sululta, Sheger City",
  "Dire Dawa City, Dire Dawa",
  "Adama City, Oromia",
  "Bahir Dar City, Amhara",
  "Gondar City, Amhara",
  "Mekelle City, Tigray",
  "Jimma City, Oromia",
]

const commonLanguages = ["English", "Amharic", "Oromo", "Tigrinya", "Arabic", "French"]

interface Props {
  children: React.ReactNode
}

export default function BecomeTaskerModal({ children }: Props) {
  const dispatch = useAppDispatch()
  const { loading } = useAppSelector((state: RootState) => state.tasker)

  /* states */
  const [location, setLocation] = useState("")
  const [bio, setBio] = useState("")
  const [languages, setLanguages] = useState<string[]>([])
  const [isAvailable, setIsAvailable] = useState(false)
  const [locationOpen, setLocationOpen] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)

  /* filter locations */
  const filteredLocations = useMemo(
    () => locations.filter((loc) => loc.toLowerCase().includes(location.toLowerCase())),
    [location]
  )

  /* add/remove languages */
  const addLanguage = (value: string) => {
    if (!languages.includes(value)) setLanguages((prev) => [...prev, value])
  }
  const removeLanguage = (lang: string) => {
    setLanguages((prev) => prev.filter((l) => l !== lang))
  }
  

  /* submit */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const formData = { location, bio, languages } 
    const result = await dispatch(createTasker(formData))
//validation
    if (!location.trim() || !bio.trim() || languages.length === 0) {
    toast.error("All fields are required. Please fill out every field.", {
      duration: 5000,
    })
    return
  }
    if (createTasker.fulfilled.match(result)) {
      // reset form
      setLocation("")
      setBio("")
      setLanguages([])
      setLocationOpen(false)
      setDialogOpen(false) // close modal

      // show toast message
     toast.success(
  //      <div className="bg-primary text-white px-4 py-2 rounded">
  //   Your request has been sent. Please wait until an admin approves your tasker profile.
  // </div>,
        "Your request has been sent. Please wait until an admin approves your tasker profile.",
        { duration: 5000 }
      )
    } else if (createTasker.rejected.match(result)) {
      toast.error(result.payload as string || "Failed to send request.", { duration: 5000 })
    
    }
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-center">Become a Tasker</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 mt-4">
          {/* Location */}
          <div className="space-y-2 relative">
            <Label className="flex items-center gap-2 font-medium">
              <MapPin size={18} className="text-primary" />
              Location
            </Label>
            <Input
              placeholder="Type your location..."
              value={location}
              onChange={(e) => {
                setLocation(e.target.value)
                setLocationOpen(true)
              }}
              className="focus:border-primary focus:border-2"
            />
            {locationOpen && (
              <div className="absolute w-full mt-1 border rounded-md bg-white shadow-md z-50">
                <Command>
                  <CommandGroup className="max-h-60 overflow-auto">
                    {filteredLocations.map((loc) => (
                      <CommandItem
                        key={loc}
                        value={loc}
                        onSelect={() => {
                          setLocation(loc)
                          setLocationOpen(false)
                        }}
                      >
                        {loc}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </div>
            )}
          </div>

          {/* Bio */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2 font-medium">
              <FileText size={18} className="text-primary" />
              Bio
            </Label>
            <Textarea
              placeholder="Tell clients about your skills"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="h-32 focus:border-primary focus:border-2"
            />
          </div>

          {/* Languages */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2 font-medium">
              <Globe size={18} className="text-primary" />
              Languages
            </Label>
            <Select onValueChange={addLanguage}>
              <SelectTrigger className="focus:border-primary focus:border-2 w-full">
                <SelectValue placeholder="Select languages" />
              </SelectTrigger>
              <SelectContent>
                {commonLanguages.map((lang) => (
                  <SelectItem key={lang} value={lang}>
                    {lang}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="flex gap-2 flex-wrap mt-2">
              {languages.map((lang) => (
                <Badge
                  key={lang}
                  variant="secondary"
                  className="cursor-pointer"
                  onClick={() => removeLanguage(lang)}
                >
                  {lang} ✕
                </Badge>
              ))}
            </div>
          </div>

          {/* Availability */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2 font-medium">
              <Calendar size={18} className="text-primary" />
              Availability
            </Label>
            <div className="flex items-center gap-3">
              <Switch checked={isAvailable} onCheckedChange={setIsAvailable} />
              <span className="text-sm text-muted-foreground">
                {isAvailable ? "Available" : "Not Available"}
              </span>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-between pt-4">
            <DialogClose asChild>
              <Button variant="outline" className="px-10">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={loading}>
              {loading ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}