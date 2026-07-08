
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { LuImage } from "react-icons/lu";
import { TaskCompletion } from "@/app/types/types";
import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import { createTaskCompletion } from "@/app/store/slices/taskCompletion";



type Field = {
  name: string;
  label: string;
  type: string;
  options?: { label: string; value: string }[];
  placeholder?: string;
};

type Props = {
  children: React.ReactNode;
  bookingId: string;
  serviceType: "tutoring" | "cleaning";
  fields: Field[];

};

export default function CompleteTaskModal({
  children,
  bookingId,
  fields,
 
}: Props) {
  const [formData, setFormData] = useState<TaskCompletion>({
    bookingId,
    completionNote: "",
    Imageurl: "",
    dynamicData: {},
  });
  const dispatch=useAppDispatch()
  const{loading,success,error}=useAppSelector(state=>state.task)



  //  Root fields 
  const handleRootChange = (name: keyof TaskCompletion, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //  Dynamic fields 
  const handleDynamicChange = (name: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      dynamicData: {
        ...prev.dynamicData,
        [name]: value,
      },
    }));
  };
  console.log('task completion form',formData)

  const renderField = (field: Field) => {
    switch (field.type) {
      case "text":
      case "number":
        return (
          <Input
            type={field.type}
            placeholder={field.placeholder}
            onChange={(e) =>
              handleDynamicChange(field.name, e.target.value)
            }
          />
        );

      case "textarea":
        return (
          <Textarea
            placeholder={field.placeholder}
            className="py-3"
            onChange={(e) =>
              handleDynamicChange(field.name, e.target.value)
            }
          />
        );

      case "select":
        return (
          <Select
            onValueChange={(value) =>
              handleDynamicChange(field.name, value)
            }
          >
            <SelectTrigger>
              <SelectValue placeholder={field.placeholder || "Select"} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case "boolean":
        return (
          <div className="flex items-center space-x-2">
            <Checkbox
              onCheckedChange={(checked) =>
                handleDynamicChange(field.name, Boolean(checked))
              }
            />
            <span className="text-sm text-muted-foreground">
              {field.label}
            </span>
          </div>
        );

      case "file-multiple":
        return (
          <Input
            type="file"
            multiple
            onChange={(e) => {
              const files = Array.from(e.target.files || []);
              handleDynamicChange(field.name, files);
            }}
          />
        );

      case "multi-input":
        return (
          <Input
            placeholder={field.placeholder || "Enter values separated by comma"}
            onChange={(e) =>
              handleDynamicChange(
                field.name,
                e.target.value.split(",").map((v) => v.trim())
              )
            }
          />
        );

      default:
        return null;
    }
  };

  const handleSubmit = () => {
    if (!formData.bookingId) {
      console.error("Missing bookingId");
      return;
    }

    console.log("Submitting Task Completion:", formData);
    dispatch(createTaskCompletion(formData))

    // onSubmit(formData);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader >
          <DialogTitle className="text-center">
            Complete Task
          </DialogTitle>
        </DialogHeader>

        {/*  Completion Note */}
        <div className="space-y-3">
          <Label>Completion Note</Label>
          <Textarea
            placeholder="Describe what was completed, any issues, and final outcome..."
            className="py-3"
            onChange={(e) =>
              handleRootChange("completionNote", e.target.value)
            }
          />
        </div>

        {/*  Dynamic Fields */}
        <div className="space-y-5 mt-4">
          {fields.map((field) => (
            <div key={field.name} className="space-y-2">
              {field.type !== "boolean" && (
                <Label>{field.label}</Label>
              )}
              {renderField(field)}
            </div>
          ))}
        </div>

        {/*  Image Upload */}
        <div className="space-y-2 mt-4">
          <Label className="flex items-center gap-2">
            Upload Image
          </Label>

          <Label
            htmlFor="file"
            className="flex items-center justify-center gap-2 border border-gray-500 bg-gray-50 rounded-lg py-6 cursor-pointer hover:bg-black/5 transition"
          >
            <LuImage size={18} className="text-gray-500" />
            <span className="text-sm font-medium text-gray-500">
              Upload Images
            </span>
          </Label>

          <Input
            id="file"
            type="file"
            multiple
            className="hidden"
            onChange={(e) => {
              const files = Array.from(e.target.files || []);
              handleRootChange("Imageurl", files); 
            }}
          />
        </div>

        {/*  Submit */}
        <Button className={`w-full mt-6 ${loading.create?'animate-pulse':''}`} onClick={handleSubmit}>
          {loading.create ?" submitting":"   Submit Completion"}
       
        </Button>
      </DialogContent>
    </Dialog>
  );
}