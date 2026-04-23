import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '@/app/store/store'
import { createPayment } from '@/app/store/slices/paymentSlice'
import { RootState } from '@/app/store/store'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Loader2, CreditCard } from 'lucide-react'

interface PaymentConfirmModalProps {
  children: React.ReactNode
  bookingId: string
  amount: number
  bookingTitle?: string
}

export default function PaymentConfirmModal({ 
  children, 
  bookingId, 
  amount,
 
}: PaymentConfirmModalProps) {
  const dispatch = useDispatch<AppDispatch>()
  const { loading } = useSelector((state: RootState) => state.payment)
  const [isOpen, setIsOpen] = useState(false)

  const handleConfirmPayment = async () => {
    try {
      const result = await dispatch(createPayment(bookingId))
      
      if (createPayment.fulfilled.match(result)) {
        const checkoutUrl = result.payload.data.checkout_url
        
        if (checkoutUrl) {
      window.open(checkoutUrl, "_blank")
    }
      }
    } catch (error) {
      console.error('Payment failed:', error)
    }
  }

 

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Confirm Payment
          </DialogTitle>
        
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Booking Details */}
          <div className="bg-muted/50 rounded-lg p-4">
            {/* <h4 className="font-medium mb-2">{bookingTitle}</h4> */}
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Total Amount</span>
              <span className="text-2xl font-bold text-primary">
                ${amount.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Payment Info */}
          <div className="space-y-2">
            
            <p className="text-sm text-muted-foreground">
              Payment processing is handled securely by Chapa Payment Gateway.
            </p>
          </div>

          {/* Error Display */}
          {/* {error && (
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3">
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )} */}
        </div>

        <DialogFooter className="flex gap-2">
          <DialogClose asChild>
            <Button variant="outline" className="flex-1">
              Cancel
            </Button>
          </DialogClose>

          <Button 
            onClick={handleConfirmPayment}
            disabled={loading.createPayment}
            className="flex-1"
          >
            {loading.createPayment ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <CreditCard className="mr-2 h-4 w-4" />
                Confirm Payment
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
