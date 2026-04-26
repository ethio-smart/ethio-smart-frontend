
"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";

import { Star } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { createReview } from "@/app/store/slices/reviewSlice";
import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import { toast } from "sonner";

interface Props {
  open: boolean;
  onClose: () => void;
  bookingId:string
}

export default function RateTaskerModal({
  open,
  onClose,
  bookingId
}: Props) {
  const dispatch = useAppDispatch();
  console.log('booking id',bookingId)
  const { loading,success } = useAppSelector(state => state.review);

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
 

  const reset = () => {
    setRating(0);
    setComment("");
  };

  const handleSubmit = async () => {
    if (!rating) return;

    await dispatch(
      createReview({
        bookingId: bookingId, 
        rating,
        comment,
      })
    ); 

   
   
  };
  useEffect(() => {
  if (success) {
    toast.success("Tasker rated successfully");
    onClose();
     reset();
  }
}, [success,onClose]);

  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        onClose();
        reset();
      }}
    >
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">
            Rate the tasker
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <Label>How was your experience?</Label>

          {/* Stars */}
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={30}
                onClick={() => setRating(star)}
                className={`cursor-pointer transition ${
                  rating >= star
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>

          {/* Comment */}
          <Label>Write your review</Label>
          <Textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your experience (optional)"
            className="min-h-30"
          />

          {/* Buttons */}
          <div className="flex justify-end gap-3">
            <DialogClose asChild>
              <Button
                variant="outline"
              
              >
                Skip
              </Button>
            </DialogClose>

            <Button
              onClick={handleSubmit}
              disabled={loading || !rating}
              className="bg-primary text-white"
            >
              {loading ? "Submitting..." : "Submit Review"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}