"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
   
  Calendar, 
  MapPin, 
  DollarSign, 
  Clock, 
  User, 
  Star,
  CreditCard,
  FileText
} from "lucide-react";
import { Booking } from "@/app/types/types";

interface PaymentDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking: Booking;
}

export default function PaymentDetailsModal({ isOpen, onClose, booking }: PaymentDetailsModalProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'AWAITING_PAYMENT':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'CONFIRMED':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'COMPLETED':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'CANCELLED':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const taskerName = booking.tasker.user
    ? `${booking.tasker.user.firstName} ${booking.tasker.user.lastName}`
    : 'Unknown Tasker';

  const taskerInitials = booking.tasker.user
    ? `${booking.tasker.user.firstName[0]}${booking.tasker.user.lastName[0]}`
    : '??';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-bold">Payment Details</DialogTitle>
           
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Status Badge */}
          <div className="flex justify-center">
            <Badge variant="secondary" className={`text-sm font-medium ${getStatusColor(booking.status)}`}>
              {booking.status.replace('_', ' ')}
            </Badge>
          </div>

          {/* Tasker Information */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
              <User className="h-5 w-5" />
              Tasker Information
            </h3>
            <div className="flex items-start gap-4">
             
              <div className="flex-1">
                <h4 className="font-semibold text-lg">{taskerName}</h4>
                <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span>{booking.tasker.rating}</span>
                  <span className="text-xs">({booking.tasker.totalReviews} reviews)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Service Details */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Service Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Service Title</p>
                <p className="font-semibold">{booking.serviceRequest.tittle || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Category</p>
                <p className="font-semibold">{booking.serviceRequest.category?.name || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Budget</p>
                <p className="font-semibold text-primary flex items-center gap-1">
                  <DollarSign className="h-4 w-4" />
                  {booking.serviceRequest.budget?.toLocaleString() || 'N/A'}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Status</p>
                <p className="font-semibold">{booking.status.replace('_', ' ')}</p>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm font-medium text-muted-foreground mb-2">Description</p>
              <p className="text-sm leading-relaxed">{booking.serviceRequest.description || 'No description provided'}</p>
            </div>
          </div>

          {/* Schedule Information */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Schedule Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Date</p>
                <p className="font-semibold flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {booking.serviceRequest.preferedDate ? formatDate(booking.serviceRequest.preferedDate) : 'N/A'}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Time</p>
                <p className="font-semibold flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {booking.serviceRequest.preferedDate ? formatTime(booking.serviceRequest.preferedDate) : 'N/A'}
                </p>
              </div>
              <div className="md:col-span-2">
                <p className="text-sm font-medium text-muted-foreground">Location</p>
                <p className="font-semibold flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {booking.serviceRequest.location || 'N/A'}
                </p>
              </div>
            </div>
          </div>

          {/* Payment Information */}
         

          {/* Dynamic Data (if available) */}
          {booking.serviceRequest.dynamicData && Object.keys(booking.serviceRequest.dynamicData).length > 0 && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-lg mb-3">Additional Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {Object.entries(booking.serviceRequest.dynamicData).map(([key, value]) => (
                  <div key={key} className="border rounded-md p-3 bg-white">
                    <p className="text-sm font-medium text-muted-foreground capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </p>
                    <p className="font-semibold">
                      {typeof value === "boolean" ? (value ? "Yes" : "No") : String(value || "N/A")}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
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
