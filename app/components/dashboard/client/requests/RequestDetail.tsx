

"use client";

import { FileText, MapPin, Calendar } from "lucide-react";

type RequestDetailsProps = {
  description?: string;
  preferedDate?: string;
  location?: string;
  title?: string;
  dynamicData?: Record<string, any>; 
};

export default function RequestDetails({
  description = "",
  preferedDate,
  location = "",
  title = "",
  dynamicData,
}: RequestDetailsProps) {
  // ✅ normalize dynamicData (critical)
  const safeDynamicData =
    dynamicData && typeof dynamicData === "object" ? dynamicData : {};

  // ✅ safe date parsing
  const date = preferedDate ? new Date(preferedDate) : null;
  const isValidDate = date && !isNaN(date.getTime());

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border space-y-6">
        {/* Header */}
        <div className="flex items-center gap-2">
          <FileText size={18} />
          <h2 className="font-semibold text-lg">Service Details</h2>
        </div>

        {/* Basic Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="font-medium">Title</p>
            <p className="text-muted-foreground">{title || "N/A"}</p>
          </div>

          <div>
            <p className="font-medium">Location</p>
            <p className="text-muted-foreground flex items-center gap-1">
              <MapPin size={14} /> {location || "N/A"}
            </p>
          </div>

          <div>
            <p className="font-medium">Scheduled Date</p>
            <p className="text-muted-foreground flex items-center gap-1">
              <Calendar size={14} />
              {isValidDate ? (
                <>
                  {date.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}{" "}
                  at{" "}
                  {date.toLocaleTimeString("en-US", {
                    hour: "numeric",
                    minute: "2-digit",
                  })}
                </>
              ) : (
                "Not scheduled"
              )}
            </p>
          </div>
        </div>

        {/* Description */}
        <div>
          <p className="font-medium text-sm mb-1">Description</p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {description || "No description provided"}
          </p>
        </div>

        {/* Additional Details */}
        {Object.keys(safeDynamicData).length > 0 && (
          <div className="border-t pt-4">
            <h3 className="font-semibold mb-3">Additional Details</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              {Object.entries(safeDynamicData).map(([key, value]) => (
                <div
                  key={key}
                  className="flex justify-between border rounded-md p-3 bg-gray-50"
                >
                  <span className="font-medium">{key}</span>
                  <span className="font-medium text-right">
                    {value ?? "N/A"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}