'use client';

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Loader2, AlertTriangle, RotateCcw } from "lucide-react";
import { Payment } from "@/app/types/types";

interface Props {
  payment: Payment | null;
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function RefundModal({ payment, open, onClose, onConfirm }: Props) {
  const [step, setStep] = useState<1 | 2>(1);
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);

  if (!payment) return null;

  const handleConfirm = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onConfirm();
    }, 1500);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <RotateCcw className="text-red-500 w-5 h-5" />
            <DialogTitle>Process Refund</DialogTitle>
          </div>
          <p className="text-xs text-muted-foreground">{payment.id}</p>
        </DialogHeader>

        {step === 1 ? (
          <div className="space-y-4 mt-4">
            <div className="bg-muted/40 p-4 rounded-lg flex justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Amount</p>
                <p className="text-xl font-semibold">${payment.amount.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Client</p>
                <p>{payment.client}</p>
              </div>
            </div>

            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Select reason</option>
              <option value="client_request">Client request</option>
              <option value="service_quality">Poor service</option>
              <option value="duplicate">Duplicate</option>
            </select>

            <div className="flex gap-2 items-start text-sm text-amber-600">
              <AlertTriangle className="w-4 h-4 mt-0.5" />
              This will refund full amount.
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={onClose}>Cancel</Button>
              <Button
                disabled={!reason}
                onClick={() => setStep(2)}
                className="bg-red-600 hover:bg-red-700"
              >
                Continue
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4 mt-4">
            <div className="text-center">
              <AlertTriangle className="mx-auto w-8 h-8 text-red-500 mb-2" />
              <p>Confirm refund ${payment.amount.toFixed(2)}?</p>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={onClose}>Cancel</Button>
              <Button onClick={handleConfirm} className="bg-red-600">
                {loading ? <Loader2 className="animate-spin w-4 h-4" /> : "Confirm"}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}