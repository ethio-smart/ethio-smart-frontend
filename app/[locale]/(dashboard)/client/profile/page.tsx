


'use client';

import AccountSettingsCard from '@/app/[locale]/components/dashboard/tasker/profile/AccountSettingCard';
import ProfileDetailCard from '@/app/[locale]/components/dashboard/tasker/profile/ProfileDetailCard';
import ProfileHeaderCard from '@/app/[locale]/components/dashboard/tasker/profile/ProfileHeaderCard';
// import AccountSettingsCard from '@/app/components/dashboard/tasker/profile/AccountSettingCard';
// import ProfileDetailCard from '@/app/components/dashboard/tasker/profile/ProfileDetailCard';
// import ProfileHeaderCard from '@/app/components/dashboard/tasker/profile/ProfileHeaderCard';
import { useAppSelector } from '@/app/hooks/hooks';
import { User } from '@/app/types/types';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';



export default function ClientProfilePage() {
  const{user}=useAppSelector((state)=>state.auth)
  console.log('user from client profile',user)
  // const [user, setUser] = useState<UserProfile>(DUMMY_USER);
  const [editUser, setEditUser] = useState<User>(user as User);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setEditUser(user);
  }, [user]);

  const handleSave = () => {
    // setUser(editUser);
    setIsEditing(false);
    toast.success('Profile updated');
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Client Profile</h1>

      <ProfileHeaderCard
        user={isEditing ? editUser : user}
        isEditing={isEditing}
        onEditClick={() => setIsEditing(true)}
      />

      <ProfileDetailCard
        user={user}
        isEditing={isEditing}
        editUser={editUser}
        setEditUser={setEditUser}
        onSave={handleSave}
        onCancel={() => setIsEditing(false)}
      />

      <AccountSettingsCard
        user={user}
        onChangePassword={() => {}}
      />
    </div>
  );
}
