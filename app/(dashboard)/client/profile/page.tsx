import AccountDetailForm from "@/app/components/dashboard/client/profile/AccountDetailForm";
import ActivityMetrics from "@/app/components/dashboard/client/profile/ActivityMetrics";
import ProfileCard from "@/app/components/dashboard/client/profile/ProfileCard";
import ProfileHeader from "@/app/components/dashboard/client/profile/ProfileHeader";
import VerificationStatus from "@/app/components/dashboard/client/profile/VerificationStatus";


export default function ClientProfilePage() {
  return (
    <div className="p-6 space-y-6">
      <ProfileHeader />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column */}
        <div className="space-y-6">
          <ProfileCard/>
          <ActivityMetrics/>
          
        </div>

        {/* Right column */}
        <div className=" lg:col-span-2 flex flex-col gap-10">
          <AccountDetailForm/>
          <VerificationStatus/>
        </div>
      </div>
    </div>
  )
}