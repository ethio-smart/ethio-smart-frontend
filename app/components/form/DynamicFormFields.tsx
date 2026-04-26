/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export type FieldType = "text" | "number" | "select" | "boolean"

export type DynamicField = {
  name: string
  label: string
  type: FieldType
  options?: string[]
  placeholder?: string
  required?: boolean
}

export function DynamicFormFields({
  fields,
  formData,
  setFormData,
}: any) {

  const handleChange = (name: string, value: any) => {
    setFormData({
      ...formData,
      dynamicData: {
        ...formData.dynamicData,
        [name]: value,
      },
    })
  }
  console.log('dynamic data',formData)

  return (
    <Card className="border-none shadow-none">
      <CardContent className="space-y-6">

        {fields.map((field: DynamicField) => (
          <div key={field.name} className="space-y-2">

            <Label>{field.label}</Label>

            {/* TEXT */}
            {field.type === "text" && (
              <Input
                placeholder={field.placeholder || `Enter ${field.label}`}
                value={formData.dynamicData?.[field.name] || ""}
                onChange={(e) =>
                  handleChange(field.name, e.target.value)
                }
              />
            )}

            {/* NUMBER */}
            <div className="flex">
            {field.type === "number" && (
              <Input
                type="number"
                placeholder={field.placeholder || `Enter ${field.label}`}
                value={formData.dynamicData?.[field.name] || ""}
                onChange={(e) =>
                  handleChange(field.name, Number(e.target.value))
                }
              />
            )}
            </div>

            {/* BOOLEAN */}
            {field.type === "boolean" && (
              <div className="flex items-center gap-2">
                <Checkbox
                  checked={Boolean(formData.dynamicData?.[field.name])}
                  onCheckedChange={(checked) =>
                    handleChange(field.name, checked === true)
                  }
                />
                <span>{field.placeholder || "Yes / No"}</span>
              </div>
            )}


            {/* SELECT */}
            {field.type === "select" && (
              <Select
                value={formData.dynamicData?.[field.name] || ""}
                onValueChange={(val) =>
                  handleChange(field.name, val)
                }
                
              >
                <SelectTrigger className="w-1/2">
                  <SelectValue
                    placeholder={
                      field.placeholder || "Select option"
                    }
                  />
                </SelectTrigger>

                <SelectContent>
                  {field.options?.map((opt) => (
                    <SelectItem key={opt} value={opt}>
                      {opt}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}

          </div>
        ))}
      </CardContent>
    </Card>
  )
}