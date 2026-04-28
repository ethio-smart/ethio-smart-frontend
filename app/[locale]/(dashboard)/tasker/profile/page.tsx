
'use client';

import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import StatsGrid from '@/app/components/dashboard/tasker/profile/StatsGrid';
import ProfileHeaderCard from '@/app/components/dashboard/tasker/profile/ProfileHeaderCard';
import ProfileDetailCard from '@/app/components/dashboard/tasker/profile/ProfileDetailCard';
import AccountSettingsCard from '@/app/components/dashboard/tasker/profile/AccountSettingCard';
import { useAppDispatch, useAppSelector } from '@/app/hooks/hooks';
import { fetchUser, setUser } from '@/app/store/slices/authSlice';
import {  CircleCheckBig, MessageSquare, Star, Wallet } from 'lucide-react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { Button } from '@/components/ui/button';

export default function TaskerProfilePage() {
    const{user}=useAppSelector((state)=>state.auth )
  const [tasker, setTasker] = useState();
  //
const STATS = [
  // {
  //   label: 'Total Jobs Completed',
  //   value: 47,
  //   icon:   CircleCheckBig,
  //   color: 'text-blue-600',
  //   bg: 'bg-blue-100',
  // },
  {
    label: 'Total Earnings',
    value: user?.tasker?.totalEarnings,
    icon: Wallet,
    color: 'text-green-600',
    bg: 'bg-green-100',
  },
  {
    label: 'Average Rating',
    value: user?.tasker?.rating,
    icon: Star,
    color: 'text-yellow-600',
    bg: 'bg-yellow-100',
  },
  {
    label: 'Total Reviews',
    value: user?.tasker?.totalReviews,
    icon: MessageSquare,
    color: 'text-purple-600',
    bg: 'bg-purple-100',
  }
]

  const [editUser, setEditUser] = useState(user);
  const [editTasker, setEditTasker] = useState();
  const [isEditing, setIsEditing] = useState(false);
  const dispatch=useAppDispatch()
  // console.log('user from tasker page',user)

  useEffect(() => {
    setEditUser(user);
    setEditTasker(tasker);
    dispatch(fetchUser())
  }, [user, tasker]);

  const handleSave = () => {
    setUser(editUser);
    setTasker(editTasker);
    setIsEditing(false);
    toast.success('Tasker profile updated');
  };
const locale=useLocale()
  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
      <h1 className="text-2xl font-bold">Tasker Profile</h1>
       <Link
          target="_blank"
          rel="noopener noreferrer"
          href={
             `/${locale}/resume/tasker`
           
          }
        >
          {/* <FileText color="black"/> */}
          <Button variant="outline" className="w-full py-5">
            View Resume
          </Button>
        </Link>
      </div>

      <ProfileHeaderCard
        user={isEditing ? editUser : user}
        // tasker={tasker}
        isEditing={isEditing}
        onEditClick={() => setIsEditing(true)}
      />

      <StatsGrid stats={STATS}  />

      <ProfileDetailCard
        user={user}
        tasker={user?.tasker}
        isEditing={isEditing}
        editUser={editUser}
        setEditUser={setEditUser}
        editTasker={editTasker}
        setEditTasker={setEditTasker}
        onSave={handleSave}
        onCancel={() => setIsEditing(false)}
      />

     

      <AccountSettingsCard
        user={user}
        // tasker={user?.tasker}
        onChangePassword={() => {}}
      />
    </div>
  );
}