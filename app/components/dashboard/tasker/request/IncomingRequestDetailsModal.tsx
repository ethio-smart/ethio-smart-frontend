"use client";

import {
  FileText,
  MapPin,
  Calendar,
  CircleDollarSign,
 
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import StatusBadge from "../../client/requests/StatusBage";

type IncomingRequestDetailsModalProps = {
  isOpen: boolean;
  onClose: () => void;
  invitation: any;
};

export default function IncomingRequestDetailsModal({
  isOpen,
  onClose,
  invitation,
}: IncomingRequestDetailsModalProps) {
  const request = invitation?.serviceRequest;
  const date = request?.preferedDate ? new Date(request.preferedDate) : null;
  const isValidDate = date && !isNaN(date.getTime());

  if (!invitation || !request) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-10">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <DialogTitle className="text-xl font-bold">
                Incoming Request Details
              </DialogTitle>
              <StatusBadge status={invitation.status} />
            </div>
          
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Service Request Details */}
          <div className="">
            <div className="flex items-center gap-2">
              <FileText size={18} />
              <h2 className="font-semibold text-lg">Service Details</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-medium">Title</p>
                <p className="text-muted-foreground">{request.tittle || "N/A"}</p>
              </div>

              <div>
                <p className="font-medium">Category</p>
                <p className="text-muted-foreground">
                  {request.category?.name || "N/A"}
                </p>
              </div>

              <div>
                <p className="font-medium">Location</p>
                <p className="text-muted-foreground flex items-center gap-1">
                  <MapPin size={14} /> {request.location || "N/A"}
                </p>
              </div>

              <div>
                <p className="font-medium">Budget</p>
                <p className="text-muted-foreground flex items-center gap-1">
                  <CircleDollarSign size={14} /> ETB {request.budget || 0}
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

              <div>
                <p className="font-medium">Request Status</p>
                <p className="text-muted-foreground">
                  {request.status || "N/A"}
                </p>
              </div>
            </div>

            {/* Description */}
            <div>
              <p className="font-medium text-sm mb-1">Description</p>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {request.description || "No description provided"}
              </p>
            </div>

            {/* Dynamic Data */}
            {request.dynamicData && typeof request.dynamicData === 'object' && Object.keys(request.dynamicData).length > 0 && (
              <div className="border-t pt-4">
                <h3 className="font-semibold mb-3">Additional Details</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  {Object.entries(request.dynamicData).map(([key, value]) => (
                    <div
                      key={key}
                      className="flex justify-between border rounded-md p-3 bg-gray-50"
                    >
                      <span className="font-medium capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                      <span className="font-medium text-right">
                        {typeof value === "boolean" ? (value ? "Yes" : "No") : String(value || "N/A")}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Client Information */}
          {/* <div className="bg-white p-6 rounded-xl shadow-sm border space-y-4">
            <h3 className="font-semibold text-lg">Client Information</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-medium">Name</p>
                <p className="text-muted-foreground">
                  {request.user?.firstName} {request.user?.lastName}
                </p>
              </div>

              <div>
                <p className="font-medium">Email</p>
                <p className="text-muted-foreground">
                  {request.user?.email || "N/A"}
                </p>
              </div>

              <div>
                <p className="font-medium">Phone</p>
                <p className="text-muted-foreground">
                  {request.user?.phone || "N/A"}
                </p>
              </div>

              <div>
                <p className="font-medium">Verified</p>
                <p className="text-muted-foreground">
                  {request.user?.isVerified ? "✅ Verified" : "❌ Not Verified"}
                </p>
              </div>
            </div>
          </div> */}

          {/* Request Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
