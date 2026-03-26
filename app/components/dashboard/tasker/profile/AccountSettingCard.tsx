
// 'use client';

// import Icon from '@/components/ui/AppIcon';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// export interface TaskerProfile {
//   firstName: string;
//   lastName: string;
//   email: string;
//   phone: string;
//   location: string;
//   bio: string;
//   languages: string[];
//   skills: string[];
//   isAvailable: boolean;
//   status: 'Approved' | 'Pending' | 'Suspended';
//   cbeAccount: string;
//   verificationStatus: 'Verified' | 'Unverified';
// }
// interface AccountSettingsCardProps {
//   profile: TaskerProfile;
//   onChangePassword: () => void;
// }

// export default function AccountSettingsCard({
//   profile,
//   onChangePassword,
// }: AccountSettingsCardProps) {
//   return (
//     <Card className='shadow-2xs'>
//       <CardHeader className="border-b">
//         <CardTitle>Account Settings</CardTitle>
//       </CardHeader>

//       <CardContent className="pt-5 space-y-3">
//         {/* Password */}
//         <div className="flex items-center justify-between p-4 border rounded-lg">
//           <div className="flex items-center gap-4">
//             <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
//               <Icon name="LockClosedIcon" size={18} className="text-muted-foreground" />
//             </div>
//             <div>
//               <p className="text-sm font-medium">Password</p>
//               <p className="text-xs text-muted-foreground">Last changed 30 days ago</p>
//             </div>
//           </div>
//           <Button variant="outline" size="sm" onClick={onChangePassword}>
//             Change
//           </Button>
//         </div>

//         {/* Verification Status */}
//         <div className="flex items-center justify-between p-4 border rounded-lg">
//           <div className="flex items-center gap-4">
//             <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center">
//               <Icon name="ShieldCheckIcon" size={18} className="text-emerald-600" />
//             </div>
//             <div>
//               <p className="text-sm font-medium">Account Verification</p>
//               <p className="text-xs text-muted-foreground">Identity verification status</p>
//             </div>
//           </div>
//           <div
//             className={`px-3 py-1 rounded-full text-xs font-medium ${
//               profile.verificationStatus === 'Verified'
//                 ? 'bg-emerald-50 text-emerald-700'
//                 : 'bg-amber-50 text-amber-700'
//             }`}
//           >
//             {profile.verificationStatus}
//           </div>
//         </div>

//         {/* CBE Account */}
//         <div className="flex items-center justify-between p-4 border rounded-lg">
//           <div className="flex items-center gap-4">
//             <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
//               <Icon name="CreditCardIcon" size={18} className="text-blue-600" />
//             </div>
//             <div>
//               <p className="text-sm font-medium">CBE Payment Account</p>
//               <p className="text-xs text-muted-foreground font-mono">
//                 {profile.cbeAccount}
//               </p>
//             </div>
//           </div>
//           <div className="px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700">
//             Connected
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }
'use client';

import { Tasker, User } from '@/app/types/types';
import Icon from '@/components/ui/AppIcon';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';





interface Props {
  user: User;
  // tasker?: Tasker

  onChangePassword: () => void;
}

export default function AccountSettingsCard({
  user,
  
  onChangePassword,
}: Props) {
  return (
    <Card className="shadow-2xs">
      <CardHeader className="border-b">
        <CardTitle>Account Settings</CardTitle>
      </CardHeader>

      <CardContent className="pt-5 space-y-3">

        {/* ✅ Password (ALWAYS) */}
        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
              <Icon name="LockClosedIcon" size={18} className="text-muted-foreground" />
            </div>
            <div>
              <p className="text-sm font-medium">Password</p>
              <p className="text-xs text-muted-foreground">
                Last changed recently
              </p>
            </div>
          </div>

          <Button variant="outline" size="sm" onClick={onChangePassword}>
            Change
          </Button>
        </div>

        {user.tasker && (
          <>
            {/* Verification */}
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center">
                  <Icon name="ShieldCheckIcon" size={18} className="text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Account Verification</p>
                  <p className="text-xs text-muted-foreground">
                    Identity verification status
                  </p>
                </div>
              </div>

              <div
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                 user.tasker.isVerified
                    ? 'bg-emerald-50 text-emerald-700'
                    : 'bg-amber-50 text-amber-700'
                }`}
              >
                {user.tasker.isVerified ? 'Verified' : 'Unverified'}
              </div>
            </div>

            {/* CBE Account */}
            {user.tasker.bankAccountNumber && (
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                    <Icon name="CreditCardIcon" size={18} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium uppercase">{user.tasker.bankName} 
                      <span className='capitalize'> Payment Account</span>
                    </p>
                    <p className="text-xs text-muted-foreground font-mono">
                      {user.tasker.bankAccountNumber}
                    </p>
                  </div>
                </div>

                <div className="px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700">
                  Connected
                </div>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}