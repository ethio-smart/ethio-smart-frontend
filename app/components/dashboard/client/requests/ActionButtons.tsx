import { Button } from "@/components/ui/button";
import CancelRequestDialog from "./CancelRequestDialog";
import RaiseDisputeModal from "@/app/components/modal/RaiseDisputeModal";



export default function ActionButtons() {
    return (
        <div className="flex flex-col gap-2">
            {/* cancel request */}
            <CancelRequestDialog>
                <Button size={'lg'} className="w-full bg-red-100 text-red-500 hover:bg-red-200">Cancel Request</Button>
            </CancelRequestDialog>
            {/* raise dispute */}
            <RaiseDisputeModal>
                <Button variant="outline" size={'lg'} className="w-full b">Raise Dispute</Button>
            </RaiseDisputeModal>
        </div>
    )
}