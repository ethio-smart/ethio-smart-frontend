/* eslint-disable @typescript-eslint/no-explicit-any */

"use client"

import { useState, useMemo, useRef } from "react"
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
import { MapPin, FileText, Globe, UploadCloud, X } from "lucide-react"

import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks"
import { RootState } from "@/app/store/store"
import { createTasker } from "@/app/store/slices/taskerSlice"
import { toast } from "sonner"
import { locations } from "@/app/utils/constant"
import Image from "next/image"

const commonLanguages = ["English", "Amharic", "Oromo", "Tigrinya", "Arabic", "French"]

interface Props {
  children: React.ReactNode
}

export default function BecomeTaskerModal({ children }: Props) {
  const dispatch = useAppDispatch()
  const { loading } = useAppSelector((state: RootState) => state.tasker)

  const [step, setStep] = useState(1)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [locationOpen, setLocationOpen] = useState(false)

  const inputRef = useRef<HTMLInputElement | null>(null)

  /* SINGLE FORM STATE */
  const [form, setForm] = useState({
    location: "",
    bio: "",
    languages: [] as string[],
    isAvailable: false,
    bankName: "",
    bankAccountNumber: "",
    nationalIdNumber: "",
    proposalVideoUrl: "",
    certifications: [] as {
      file: File
      url: string
    }[],
  })

  /* UPDATE HELPER */
  const updateField = (field: string, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  /* LOCATION FILTER */
  const filteredLocations = useMemo(
    () =>
      locations.filter((loc) =>
        loc.toLowerCase().includes(form.location.toLowerCase())
      ),
    [form.location]
  )

  /* LANGUAGES */
  const addLanguage = (value: string) => {
    if (!form.languages.includes(value)) {
      updateField("languages", [...form.languages, value])
    }
  }

  const removeLanguage = (lang: string) => {
    updateField(
      "languages",
      form.languages.filter((l) => l !== lang)
    )
  }

  /* FILE HANDLING */
  const handleFiles = (fileList: FileList | null) => {
    if (!fileList) return

    const newFiles = Array.from(fileList).map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }))

    updateField("certifications", [...form.certifications, ...newFiles])
  }

  const removeFile = (index: number) => {
    updateField(
      "certifications",
      form.certifications.filter((_, i) => i !== index)
    )
  }

  /* VALIDATION */
  const validateStep1 = () => {
    if (!form.location || !form.bio || form.languages.length === 0) {
      toast.error("Please complete Step 1")
      return false
    }
    return true
  }

  const validateStep2 = () => {
    if (!form.bankName || !form.bankAccountNumber || !form.nationalIdNumber) {
      return false
    }
    return true
  }

  /* SUBMIT */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateStep1()) return setStep(1)
    if (!validateStep2()) return setStep(2)

    const payload = {
      ...form,
      certifications: form.certifications.map((c) => c.file),
    }

    const result = await dispatch(createTasker(payload))

    if (createTasker.fulfilled.match(result)) {
      toast.success("Request sent. Await admin approval.")
      setDialogOpen(false)
    } else {
      toast.error("Failed to submit")
    }
  }
  // console.log('form data',form)

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-center">
            Become a Tasker
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 mt-4">

          {/* STEP 1 */}
          {step === 1 && (
            <div className="space-y-5">

              <div className="space-y-2 relative">
                <Label className="flex items-center gap-2 font-medium">
                  <MapPin size={18} className="text-primary" />
                  Location
                </Label>

                <Input
                  value={form.location}
                  onChange={(e) => {
                    updateField("location", e.target.value)
                    setLocationOpen(true)
                  }}
                  placeholder="Type your location..."
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
                              updateField("location", loc)
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

              <div className="space-y-2">
                <Label className="flex items-center gap-2 font-medium">
                  <FileText size={18} className="text-primary" />
                  Bio
                </Label>
                <Textarea
                  value={form.bio}
                  onChange={(e) => updateField("bio", e.target.value)}
                  className="h-32 focus:border-primary focus:border-2"
                />
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2 font-medium">
                  <Globe size={18} className="text-primary" />
                  Languages
                </Label>

                <Select onValueChange={addLanguage}>
                  <SelectTrigger className="w-full">
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
                  {form.languages.map((lang) => (
                    <Badge
                      key={lang}
                      onClick={() => removeLanguage(lang)}
                      className="cursor-pointer"
                    >
                      {lang} ✕
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Switch
                  checked={form.isAvailable}
                  onCheckedChange={(v) => updateField("isAvailable", v)}
                />
                <span className="text-sm text-muted-foreground">
                  {form.isAvailable ? "Available" : "Not Available"}
                </span>
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div className="space-y-4">

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-3">
                  <Label>Bank Name</Label>
                  <Input
                    value={form.bankName}
                       placeholder="e.g. CBE, Dashen, Awash"
                    onChange={(e) => updateField("bankName", e.target.value)}
                  />
                </div>

                <div className="space-y-3">
                  <Label>Account Number</Label>
                  <Input
                    value={form.bankAccountNumber}
                       placeholder="Enter your bank account number"
                    onChange={(e) =>
                      updateField("bankAccountNumber", e.target.value)
                    }
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label>National ID</Label>
                <Input
                      placeholder="Enter your government-issued ID number"
                  value={form.nationalIdNumber}
                  onChange={(e) =>
                    updateField("nationalIdNumber", e.target.value)
                  }
                />
              </div>

              {/* CERT UPLOAD  */}
              <div className="space-y-3">
                <Label>Certifications (Optional)</Label>

                <div
                  onClick={() => inputRef.current?.click()}
                  className="border-2 border-dashed rounded-xl p-6 text-center hover:border-primary/60 transition cursor-pointer bg-muted/20"
                >
                  <div className="flex flex-col items-center gap-2">
                    <UploadCloud className="w-10 h-10 text-muted-foreground" />

                    <p className="text-sm text-muted-foreground">
                      upload your certificate here
                    </p>

                    <Input
                      ref={inputRef}
                      type="file"
                      multiple
                      accept=".pdf,.jpg,.jpeg,.png"
                      className="hidden"
                      // onChange={(e) => handleFiles(e.target.files)}
                    />
                  </div>
                </div>

                 <div className="flex flex-wrap gap-2">
                  {form.certifications.map((f, i) => (
                    <div
                      key={i}
                      className="relative w-16 h-16 rounded-lg overflow-hidden border"
                    >
                      <button
                        onClick={() => removeFile(i)}
                        className="absolute -top-1 -right-1 bg-black text-white rounded-full p-[2px]"
                      >
                        <X className="w-3 h-3" />
                      </button>

                      {f.file.type.startsWith("image/") ? (
                        <Image src={f.url} alt="" fill className="object-cover" />
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <FileText />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <Label>Proposal Video URL (Optional)</Label>
                <Input
                  value={form.proposalVideoUrl}
                        placeholder="Paste a video link introducing yourself (optional)"
                  onChange={(e) =>
                    updateField("proposalVideoUrl", e.target.value)
                  }
                />
              </div>
            </div>
          )}

          {/* NAV */}
          <div className="flex justify-between pt-4">
            {step === 1 ? (
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
            ) : (
              <Button type="button" variant="outline" onClick={() => setStep(1)}>
                Back
              </Button>
            )}

            {step === 1 ? (
              <Button
                type="button"
                onClick={() => validateStep1() && setStep(2)}
              >
                Next
              </Button>
            ) : (
              <Button type="submit" disabled={loading}>
                {loading ? "Submitting..." : "Submit"}
              </Button>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}