// // 'use client"'
// // import {
// //   CalendarDays,
// //   CircleDollarSign,
// //   Clock,
// //   Edit,
// //   MapPin,
// // } from "lucide-react"

// // import { Button } from "@/components/ui/button"
// // import { Card, CardContent } from "@/components/ui/card"
// // import StatusBadge from "./StatusBage"
// // import CancelRequestDialog from "./CancelRequestDialog"
// // import RescheduleRequestDialog from "./RescheduleRequestDialog"
// // import EditRequestDialog from "./EditRequestDialog"
// // import Link from "next/link"

// // import { Invitation } from "@/app/types/types"

// // export default function OutgoingRequestCard({ invitation, }: { invitation: Invitation }) {
// // // console.log('invitation from outgoing card',invitation)
// // // console.log('invitation from outgoing card',invitation.user.firstName)
// //   // const request = invitation
// //   const date = invitation?.preferedDate
// //     ? new Date(invitation.preferedDate)
// //     : null

// //   //  console.log('invitation from outgoing card',invitation)
// //   return (
// //     <Card className="shadow-none border h-full flex flex-col justify-between">
// //       <CardContent className="px-8 flex flex-col gap-4 flex-1">

// //         {/* Top Content */}
// //         <div className="space-y-3 max-w-3xl">

// //           <div className="flex items-center gap-3">
// //             <span className="text-xs px-2 py-1 rounded bg-secondary">
// //               {invitation?.category?.name || 'Category'}
// //             </span>

// //             <h3 className="font-bold text-xl">
// //               {invitation?.description?.slice(1, 41) || 'No description'}
// //             </h3>

// //             <StatusBadge status={invitation.status} />
// //           </div>

// //           <p className="text-sm text-muted-foreground">
// //             {invitation?.description || 'No description'}
// //           </p>

// //           <div className="flex gap-6 text-sm text-muted-foreground">

// //             <span className="flex items-center gap-2">
// //               <MapPin size={15} className="text-primary" />
// //               {invitation?.location || invitation.location || 'No location'}
// //             </span>

// //             <span className="flex items-center gap-2">
// //               <CircleDollarSign size={15} className="text-primary" />
// //               {invitation.budget }
// //             </span>

// //             <span className="flex items-center gap-2">
// //               <CalendarDays size={15} className="text-primary" />
// //               {date?.toLocaleDateString()}

// //               <Clock size={15} className="text-primary" />
// //               {date?.toLocaleTimeString([], {
// //                 hour: "numeric",
// //                 minute: "2-digit",
// //               })}
// //             </span>



// //           </div>

// //           {/* {tasker && (
// //             <p className="text-sm">
// //               Assigned to <b>{tasker.bio}</b>
// //             </p>
// //           )} */}
// //         </div>


// //         <div className="flex flex-wrap gap-2 justify-between mt-4 items-center">
// //           <div className="">
// //             <p className="text-sm">
// //               {invitation.status === "PENDING" && (
// //                 <>Invitation sent to <b>{invitation.tasker?.user?.firstName} {invitation.tasker?.user?.lastName}</b></>
// //               )}

// //               {invitation.status === "ACCEPTED" && (
// //                 <>Accepted by <b>{invitation.tasker?.user?.firstName} {invitation.tasker?.user?.lastName}</b></>
// //               )}

// //               {invitation.status === "REJECTED" && (
// //                 <>Rejected by <b>{invitation.tasker?.user?.firstName} {invitation.tasker?.user?.lastName}</b></>
// //               )}
// //             </p>
// //           </div>
// //           {/* Bottom Buttons */}
// //           <div className="flex flex-wrap gap-2 ">
// //             {invitation.status === "PENDING" && (
// //               <>
// //                 <EditRequestDialog request={invitation} >
// //                   <Button
// //                     size="lg"
// //                     variant="outline"
// //                     className="border text-black px-10 hover:bg-primary hover:text-white"
// //                   >
// //                     <Edit /> Edit
// //                   </Button>
// //                 </EditRequestDialog>

// //                 <CancelRequestDialog
                
// //                 >
// //                   <Button
// //                     size="lg"
// //                     variant="outline"
// //                     className="text-red-500 hover:bg-red-500 hover:text-white border"
// //                   >
// //                     Cancel
// //                   </Button>
// //                 </CancelRequestDialog>
// //               </>
// //             )}

// //             {invitation.status === "ACCEPTED" && (
// //               <>
// //                 <Button size="lg" variant="outline">
// //                   pay
// //                 </Button>

// //                 <RescheduleRequestDialog>
// //                   <Button
// //                     size="lg"
// //                     variant="outline"
// //                     className="border-primary border text-primary"
// //                   >
// //                     <Clock /> Reschedule
// //                   </Button>
// //                 </RescheduleRequestDialog>
// //               </>
// //             )}

// //             <Link href={`/client/requests/${invitation?.id || ''}`}>
// //               <Button
// //                 size="lg"
// //                 className="border-primary border bg-white text-primary px-10 hover:bg-primary hover:text-white"
// //               >
// //                 Details
// //               </Button>
// //             </Link>

// //           </div>
// //         </div>
// //       </CardContent>
// //     </Card>
// //   )
// // }

// 'use client'

// import {
//   CalendarDays,
//   CircleDollarSign,
//   Clock,
//   Edit,
//   MapPin,
// } from "lucide-react"

// import { Button } from "@/components/ui/button"
// import { Card, CardContent } from "@/components/ui/card"
// import StatusBadge from "./StatusBage"
// import CancelRequestDialog from "./CancelRequestDialog"
// import RescheduleRequestDialog from "./RescheduleRequestDialog"
// import EditRequestDialog from "./EditRequestDialog"
// import Link from "next/link"

// import { Invitation } from "@/app/types/types"

// export default function OutgoingRequestCard({
//   invitation,
// }: {
//   invitation: Invitation
// }) {
//   const date = invitation?.preferedDate
//     ? new Date(invitation.preferedDate)
//     : null

//   // 🔑 Centralized logic (this is what you were missing)
//   const acceptedInvitation = invitation.invitations?.find(
//     (inv) => inv.status === "ACCEPTED"
//   )

//   const pendingInvitation = invitation.invitations?.find(
//     (inv) => inv.status === "PENDING"
//   )

//   const rejectedInvitation = invitation.invitations?.find(
//     (inv) => inv.status === "REJECTED"
//   )

//   // Pick correct tasker based on request status
//   const currentInvitation =
//     invitation.status === "ACCEPTED"
//       ? acceptedInvitation
//       : invitation.status === "REJECTED"
//       ? rejectedInvitation
//       : pendingInvitation

//   const taskerUser = currentInvitation?.tasker?.user

//   return (
//     <Card className="shadow-none border h-full flex flex-col justify-between">
//       <CardContent className="px-8 flex flex-col gap-4 flex-1">

//         {/* Top Content */}
//         <div className="space-y-3 max-w-3xl">

//           <div className="flex items-center gap-3">
//             <span className="text-xs px-2 py-1 rounded bg-secondary">
//               {invitation?.category?.name || "Category"}
//             </span>

//             <h3 className="font-bold text-xl">
//               {invitation?.description?.slice(0, 40) || "No description"}
//             </h3>

//             <StatusBadge status={invitation.status} />
//           </div>

//           <p className="text-sm text-muted-foreground">
//             {invitation?.description || "No description"}
//           </p>

//           <div className="flex gap-6 text-sm text-muted-foreground">

//             <span className="flex items-center gap-2">
//               <MapPin size={15} className="text-primary" />
//               {invitation?.location || "No location"}
//             </span>

//             <span className="flex items-center gap-2">
//               <CircleDollarSign size={15} className="text-primary" />
//               {invitation?.budget}
//             </span>

//             <span className="flex items-center gap-2">
//               <CalendarDays size={15} className="text-primary" />
//               {date?.toLocaleDateString()}

//               <Clock size={15} className="text-primary" />
//               {date?.toLocaleTimeString([], {
//                 hour: "numeric",
//                 minute: "2-digit",
//               })}
//             </span>
//           </div>
//         </div>

//         {/* Bottom Section */}
//         <div className="flex flex-wrap gap-2 justify-between mt-4 items-center">

//           {/* Tasker Info */}
//           <div>
//             <p className="text-sm">
//               {invitation.status === "PENDING" && taskerUser && (
//                 <>
//                   Invitation sent to{" "}
//                   <b>
//                     {taskerUser.firstName} {taskerUser.lastName}
//                   </b>
//                 </>
//               )}

//               {invitation.status === "ACCEPTED" && taskerUser && (
//                 <>
//                   Accepted by{" "}
//                   <b>
//                     {taskerUser.firstName} {taskerUser.lastName}
//                   </b>
//                 </>
//               )}

//               {invitation.status === "REJECTED" && taskerUser && (
//                 <>
//                   Rejected by{" "}
//                   <b>
//                     {taskerUser.firstName} {taskerUser.lastName}
//                   </b>
//                 </>
//               )}

//               {/* fallback (important) */}
//               {!taskerUser && invitation.status === "PENDING" && (
//                 <>Invitation sent (waiting for tasker)</>
//               )}
//             </p>
//           </div>

//           {/* Actions */}
//           <div className="flex flex-wrap gap-2">

//             {invitation.status === "PENDING" && (
//               <>
//                 <EditRequestDialog request={invitation}>
//                   <Button
//                     size="lg"
//                     variant="outline"
//                     className="border text-black px-10 hover:bg-primary hover:text-white"
//                   >
//                     <Edit /> Edit
//                   </Button>
//                 </EditRequestDialog>

//                 <CancelRequestDialog>
//                   <Button
//                     size="lg"
//                     variant="outline"
//                     className="text-red-500 hover:bg-red-500 hover:text-white border"
//                   >
//                     Cancel
//                   </Button>
//                 </CancelRequestDialog>
//               </>
//             )}

//             {invitation.status === "ACCEPTED" && (
//               <>
//                 <Button size="lg" variant="outline">
//                   Pay
//                 </Button>

//                 <RescheduleRequestDialog>
//                   <Button
//                     size="lg"
//                     variant="outline"
//                     className="border-primary border text-primary"
//                   >
//                     <Clock /> Reschedule
//                   </Button>
//                 </RescheduleRequestDialog>
//               </>
//             )}

//             <Link href={`/client/requests/${invitation?.id || ""}`}>
//               <Button
//                 size="lg"
//                 className="border-primary border bg-white text-primary px-10 hover:bg-primary hover:text-white"
//               >
//                 Details
//               </Button>
//             </Link>

//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   )
// }
'use client'

import {
  CalendarDays,
  CircleDollarSign,
  Clock,
  Edit,
  MapPin,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import StatusBadge from "./StatusBage"
import CancelRequestDialog from "./CancelRequestDialog"
import RescheduleRequestDialog from "./RescheduleRequestDialog"
import EditRequestDialog from "./EditRequestDialog"
import Link from "next/link"

import { Invitation } from "@/app/types/types"

export default function OutgoingRequestCard({
  invitation,
}: {
  invitation: Invitation
}) {
  const date = invitation?.preferedDate
    ? new Date(invitation.preferedDate)
    : null

 
  // Pending taskers (MULTIPLE)
  const pendingTaskers =
    invitation.invitations
      ?.filter((inv) => inv.status === "PENDING")
      .map((inv) => inv.tasker?.user)
      .filter(Boolean) || []

  const pendingNames = pendingTaskers
    .map((user) => `${user.firstName} ${user.lastName}`)
    .join(", ")

  // Accepted tasker 
  const acceptedTasker =
    invitation.invitations?.find((inv) => inv.status === "ACCEPTED")
      ?.tasker?.user

  // Rejected taskers (optional, MULTIPLE)
  const rejectedTaskers =
    invitation.invitations
      ?.filter((inv) => inv.status === "REJECTED")
      .map((inv) => inv.tasker?.user)
      .filter(Boolean) || []

  const rejectedNames = rejectedTaskers
    .map((user) => `${user.firstName} ${user.lastName}`)
    .join(", ")

  return (
    <Card className="shadow-none border h-full flex flex-col justify-between">
      <CardContent className="px-8 flex flex-col gap-4 flex-1">

        {/* Top Content */}
        <div className="space-y-3 max-w-3xl">

          <div className="flex items-center gap-3">
            <span className="text-xs px-2 py-1 rounded bg-secondary">
              {invitation?.category?.name || "Category"}
            </span>

            <h3 className="font-bold text-xl">
              {invitation?.description?.slice(0, 40) || "No description"}
            </h3>

            <StatusBadge status={invitation.status} />
          </div>

          <p className="text-sm text-muted-foreground">
            {invitation?.description || "No description"}
          </p>

          <div className="flex gap-6 text-sm text-muted-foreground">

            <span className="flex items-center gap-2">
              <MapPin size={15} className="text-primary" />
              {invitation?.location || "No location"}
            </span>

            <span className="flex items-center gap-2">
              <CircleDollarSign size={15} className="text-primary" />
              {invitation?.budget}
            </span>

            <span className="flex items-center gap-2">
              <CalendarDays size={15} className="text-primary" />
              {date?.toLocaleDateString()}

              <Clock size={15} className="text-primary" />
              {date?.toLocaleTimeString([], {
                hour: "numeric",
                minute: "2-digit",
              })}
            </span>

          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-wrap gap-2 justify-between mt-4 items-center">

          {/* Tasker Info */}
          <div>
            <p className="text-sm">

              {/* PENDING */}
              {invitation.status === "PENDING" && (
                <>
                  {pendingTaskers.length > 0 ? (
                    <>
                      Invitation sent to{" "}
                      <b>{pendingNames}</b>
                    </>
                  ) : (
                    <>Invitation sent (waiting for tasker)</>
                  )}
                </>
              )}

              {/* ACCEPTED  */}
              {invitation.status === "ACCEPTED" && acceptedTasker && (
                <>
                  Accepted by{" "}
                  <b>
                    {acceptedTasker.firstName} {acceptedTasker.lastName}
                  </b>
                </>
              )}

              {/* REJECTED*/}
              {invitation.status === "REJECTED" && (
                <>
                  {rejectedTaskers.length > 0 ? (
                    <>
                      Rejected by{" "}
                      <b>{rejectedNames}</b>
                    </>
                  ) : (
                    <>Request was rejected</>
                  )}
                </>
              )}

            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-2">

            {invitation.status === "PENDING" && (
              <>
                <EditRequestDialog request={invitation}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border text-black px-10 hover:bg-primary hover:text-white"
                  >
                    <Edit /> Edit
                  </Button>
                </EditRequestDialog>

                <CancelRequestDialog>
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-red-500 hover:bg-red-500 hover:text-white border"
                  >
                    Cancel
                  </Button>
                </CancelRequestDialog>
              </>
            )}

            {invitation.status === "ACCEPTED" && (
              <>
                <Button size="lg" variant="outline">
                  Pay
                </Button>

                <RescheduleRequestDialog>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-primary border text-primary"
                  >
                    <Clock /> Reschedule
                  </Button>
                </RescheduleRequestDialog>
              </>
            )}

            <Link href={`/client/requests/${invitation?.id || ""}`}>
              <Button
                size="lg"
                className="border-primary border bg-white text-primary px-10 hover:bg-primary hover:text-white"
              >
                Details
              </Button>
            </Link>

          </div>
        </div>
      </CardContent>
    </Card>
  )
}