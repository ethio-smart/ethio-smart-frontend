// 'use client';

// import { AccountSettingsCard } from '@/app/components/dashboard/tasker/profile/AccountSettingCard';
// import { ProfileCard } from '@/app/components/dashboard/tasker/profile/ProfileHeaderCard';
// import { ProfileDetailsCard } from '@/app/components/dashboard/tasker/profile/ProfileDetailCard';
// import { WorkProfileCard } from '@/app/components/dashboard/tasker/profile/WorkProfileCard';
// import Icon from '@/components/ui/AppIcon';
// import { useState, useEffect } from 'react';
// import { toast } from 'sonner';


// type TaskerStatus = 'Approved' | 'Pending' | 'Suspended';

// interface ProfileData {
//   firstName: string;
//   lastName: string;
//   email: string;
//   phone: string;
//   location: string;
//   bio: string;
//   languages: string[];
//   skills: string[];
//   isAvailable: boolean;
//   status: TaskerStatus;
//   cbeAccount: string;
//   verificationStatus: 'Verified' | 'Unverified';
// }

// const statusConfig: Record<TaskerStatus, string> = {
//   'Approved': 'bg-emerald-50 text-emerald-700 border border-emerald-200',
//   'Pending': 'bg-amber-50 text-amber-700 border border-amber-200',
//   'Suspended': 'bg-red-50 text-red-700 border border-red-200',
// };

// const STATS = [
//   { label: 'Total Jobs Completed', value: '47', icon: 'CheckBadgeIcon', color: 'text-emerald-600', bg: 'bg-emerald-50' },
//   { label: 'Total Earnings', value: '$4,280', icon: 'BanknotesIcon', color: 'text-blue-600', bg: 'bg-blue-50' },
//   { label: 'Average Rating', value: '4.7', icon: 'StarIcon', color: 'text-amber-600', bg: 'bg-amber-50' },
//   { label: 'Total Reviews', value: '38', icon: 'ChatBubbleLeftRightIcon', color: 'text-purple-600', bg: 'bg-purple-50' },
// ];

// export default function ProfilePage() {
//   const [isHydrated, setIsHydrated] = useState(false);
//   const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
//   const [newLanguage, setNewLanguage] = useState('');
//   const [newSkill, setNewSkill] = useState('');
//   const [passwordForm, setPasswordForm] = useState({ current: '', newPass: '', confirm: '' });

//   const [profile, setProfile] = useState<ProfileData>({
//     firstName: 'Abebe',
//     lastName: 'Kebede',
//     email: 'abebe.kebede@example.com',
//     phone: '+251 91 234 5678',
//     location: 'Addis Ababa, Ethiopia',
//     bio: 'Professional tasker with 5+ years of experience in home services. Specializing in cleaning, plumbing, and electrical work. Committed to delivering high-quality results.',
//     languages: ['Amharic', 'English', 'Oromo'],
//     skills: ['Deep Cleaning', 'Plumbing', 'Electrical Wiring', 'Painting', 'Carpentry'],
//     isAvailable: true,
//     status: 'Approved',
//     cbeAccount: 'CBE-1000-2345-6789',
//     verificationStatus: 'Verified',
//   });

//   const [editForm, setEditForm] = useState<ProfileData>(profile);

//   useEffect(() => { setIsHydrated(true); }, []);

//   const handleSaveProfile = () => {
//     setProfile(editForm);
//     setIsEditing(false);
//     toast.success('Profile updated successfully');
//   };

//   const handleCancelEdit = () => {
//     setEditForm(profile);
//     setIsEditing(false);
//   };

//   const showToast = (message: string, type: 'success' | 'error' = 'success') => {
//     if (type === 'error') toast.error(message);
//     else toast.success(message);
//   };

//   const handleAddLanguage = () => {
//     if (newLanguage.trim() && !editForm.languages.includes(newLanguage.trim())) {
//       setEditForm(f => ({ ...f, languages: [...f.languages, newLanguage.trim()] }));
//       setNewLanguage('');
//     }
//   };

//   const handleRemoveLanguage = (lang: string) => {
//     setEditForm(f => ({ ...f, languages: f.languages.filter(l => l !== lang) }));
//   };

//   const handleAddSkill = () => {
//     if (newSkill.trim() && !editForm.skills.includes(newSkill.trim())) {
//       setEditForm(f => ({ ...f, skills: [...f.skills, newSkill.trim()] }));
//       setNewSkill('');
//     }
//   };

//   const handleRemoveSkill = (skill: string) => {
//     setEditForm(f => ({ ...f, skills: f.skills.filter(s => s !== skill) }));
//   };

//   const handlePasswordChange = () => {
//     if (!passwordForm.current || !passwordForm.newPass || !passwordForm.confirm) {
//       toast.error('Please fill all fields');
//       return;
//     }
//     if (passwordForm.newPass !== passwordForm.confirm) {
//       toast.error('Passwords do not match');
//       return;
//     }
//     toast.success('Password changed successfully');
//     setIsPasswordModalOpen(false);
//     setPasswordForm({ current: '', newPass: '', confirm: '' });
//   };

//   const sidebarWidth = isSidebarCollapsed ? 'lg:pl-' : 'lg:pl-[0px]';

//   if (!isHydrated) {
//     return (
//       <div className="min-h-screen bg-background flex items-center justify-center">
//         <div className="w-10 h-10 rounded-full border-4 border-primary border-t-transparent animate-spin" />
//       </div>
//     );
//   }

//   const displayData = isEditing ? editForm : profile;

//   return (
//     <div className="min-h-screen bg-backgroun">
     
//       <main id="main-content" className={`pt- transition-all duration-[250ms] ease-out ${sidebarWidth}`}>
//         <div className="p-4 lg:p-4 space-y-5  mx-auto">

//           {/* Page Header */}
//           <div>
//             <h1 className="text-xl font-bold text-foreground font-heading">Profile</h1>
//             <p className="text-sm text-muted-foreground mt-0.5">Manage your tasker profile and account settings</p>
//           </div>
     



//           {/* Profile Header Card */}
//           {/* <ProfileCard profile={displayData} isEditing={isEditing} setEditForm={setEditForm} setIsEditing={setIsEditing} showToast={showToast} />  */}
//           <div className="bg-card rounded-xl border border-border shadow-warm-sm p-6">
//             <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
//               {/* Avatar */}
//               <div className="relative flex-shrink-0">
//                 <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary">
//                   {profile.firstName.charAt(0)}{profile.lastName.charAt(0)}
//                 </div>
//                 <button className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-warm-sm hover:bg-secondary transition-standard">
//                   <Icon name="CameraIcon" size={13} variant="outline" />
//                 </button>
//               </div>
//               {/* Info */}
//               <div className="flex-1 min-w-0">
//                 <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1">
//                   <h2 className="text-xl font-bold font-heading text-foreground">{profile.firstName} {profile.lastName}</h2>
//                   <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusConfig[profile.status]}`}>{profile.status}</span>
//                 </div>
//                 <div className="flex flex-col gap-1">
//                   <div className="flex items-center gap-2 text-sm text-muted-foreground">
//                     <Icon name="EnvelopeIcon" size={13} variant="outline" />
//                     {profile.email}
//                   </div>
//                   <div className="flex items-center gap-2 text-sm text-muted-foreground">
//                     <Icon name="PhoneIcon" size={13} variant="outline" />
//                     {profile.phone}
//                   </div>
//                   <div className="flex items-center gap-2 text-sm text-muted-foreground">
//                     <Icon name="MapPinIcon" size={13} variant="outline" />
//                     {profile.location}
//                   </div>
//                 </div>
//               </div>
//               {/* Edit Button */}
//               <button onClick={() => { setEditForm(profile); setIsEditing(true); }} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-secondary transition-standard press-effect shadow-warm-sm flex-shrink-0">
//                 <Icon name="PencilIcon" size={14} variant="outline" />
//                 Edit Profile
//               </button>
//             </div>
//           </div>

//           {/* Stats Section */}
//           <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
//             {STATS.map(stat => (
//               <div key={stat.label} className="bg-card rounded-xl border border-border shadow-warm-sm p-4 text-center">
//                 <div className={`w-10 h-10 rounded-lg ${stat.bg} flex items-center justify-center mx-auto mb-2`}>
//                   <Icon name={stat.icon as any} size={18} variant="outline" className={stat.color} />
//                 </div>
//                 <p className={`text-xl font-bold font-mono ${stat.color}`}>{stat.value}</p>
//                 <p className="text-xs text-muted-foreground mt-0.5 leading-tight">{stat.label}</p>
//               </div>
//             ))}
//           </div>

//           {/* Profile Details Section */}
//           <div className="bg-card rounded-xl border border-border shadow-warm-sm overflow-hidden">
//             <div className="flex items-center justify-between p-5 border-b border-border">
//               <h3 className="font-semibold text-foreground font-heading">Profile Details</h3>
//               {isEditing && (
//                 <div className="flex items-center gap-2">
//                   <button onClick={handleCancelEdit} className="px-3 py-1.5 rounded-lg border border-border text-sm text-foreground hover:bg-muted transition-standard">Cancel</button>
//                   <button onClick={handleSaveProfile} className="px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-secondary transition-standard press-effect">Save Changes</button>
//                 </div>
//               )}
//             </div>
//             <div className="p-5 space-y-5">
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                 {[
//                   { label: 'First Name', key: 'firstName' as const },
//                   { label: 'Last Name', key: 'lastName' as const },
//                   { label: 'Email', key: 'email' as const },
//                   { label: 'Phone', key: 'phone' as const },
//                   { label: 'Location', key: 'location' as const },
//                 ].map(field => (
//                   <div key={field.key}>
//                     <label className="block text-xs font-medium text-muted-foreground mb-1.5">{field.label}</label>
//                     {isEditing ? (
//                       <input type="text" value={editForm[field.key] as string} onChange={e => setEditForm(f => ({ ...f, [field.key]: e.target.value }))} className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-standard" />
//                     ) : (
//                       <p className="text-sm text-foreground px-3 py-2.5 rounded-lg bg-muted/50">{profile[field.key] as string}</p>
//                     )}
//                   </div>
//                 ))}
//               </div>
//               {/* Bio */}
//               <div>
//                 <label className="block text-xs font-medium text-muted-foreground mb-1.5">Bio</label>
//                 {isEditing ? (
//                   <textarea value={editForm.bio} onChange={e => setEditForm(f => ({ ...f, bio: e.target.value }))} rows={3} className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-standard resize-none" />
//                 ) : (
//                   <p className="text-sm text-foreground px-3 py-2.5 rounded-lg bg-muted/50 leading-relaxed">{profile.bio}</p>
//                 )}
//               </div>
//               {/* Languages */}
//               <div>
//                 <label className="block text-xs font-medium text-muted-foreground mb-1.5">Languages Spoken</label>
//                 <div className="flex flex-wrap gap-2">
//                   {displayData.languages.map(lang => (
//                     <span key={lang} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
//                       {lang}
//                       {isEditing && (
//                         <button onClick={() => handleRemoveLanguage(lang)} className="hover:text-red-600 transition-standard">
//                           <Icon name="XMarkIcon" size={12} variant="outline" />
//                         </button>
//                       )}
//                     </span>
//                   ))}
//                   {isEditing && (
//                     <div className="flex items-center gap-2">
//                       <input type="text" value={newLanguage} onChange={e => setNewLanguage(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleAddLanguage()} placeholder="Add language..." className="px-3 py-1 rounded-full border border-dashed border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-standard w-32" />
//                       <button onClick={handleAddLanguage} className="w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-secondary transition-standard">
//                         <Icon name="PlusIcon" size={12} variant="outline" />
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Professional Info Section */}
//           <div className="bg-card rounded-xl border border-border shadow-warm-sm overflow-hidden">
//             <div className="p-5 border-b border-border">
//               <h3 className="font-semibold text-foreground font-heading">Professional Info</h3>
//             </div>
//             <div className="p-5 space-y-5">
//               {/* Resume Upload */}
//               <div>
//                 <label className="block text-xs font-medium text-muted-foreground mb-2">Resume / CV</label>
//                 <div className="flex items-center gap-3 p-4 rounded-lg border-2 border-dashed border-border hover:border-primary/50 transition-standard cursor-pointer">
//                   <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
//                     <Icon name="DocumentArrowUpIcon" size={20} variant="outline" className="text-muted-foreground" />
//                   </div>
//                   <div>
//                     <p className="text-sm font-medium text-foreground">Upload Resume</p>
//                     <p className="text-xs text-muted-foreground">PDF, DOC up to 5MB</p>
//                   </div>
//                   <button className="ml-auto px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-medium hover:bg-secondary transition-standard">Upload</button>
//                 </div>
//               </div>
//               {/* Skills */}
//               <div>
//                 <label className="block text-xs font-medium text-muted-foreground mb-2">Skills</label>
//                 <div className="flex flex-wrap gap-2">
//                   {displayData.skills.map(skill => (
//                     <span key={skill} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-muted text-foreground text-sm font-medium">
//                       {skill}
//                       {isEditing && (
//                         <button onClick={() => handleRemoveSkill(skill)} className="hover:text-red-600 transition-standard">
//                           <Icon name="XMarkIcon" size={12} variant="outline" />
//                         </button>
//                       )}
//                     </span>
//                   ))}
//                   {isEditing && (
//                     <div className="flex items-center gap-2">
//                       <input type="text" value={newSkill} onChange={e => setNewSkill(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleAddSkill()} placeholder="Add skill..." className="px-3 py-1 rounded-full border border-dashed border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-standard w-28" />
//                       <button onClick={handleAddSkill} className="w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-secondary transition-standard">
//                         <Icon name="PlusIcon" size={12} variant="outline" />
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               </div>
//               {/* Availability Toggle */}
//               <div className="flex items-center justify-between p-4 rounded-lg border border-border">
//                 <div>
//                   <p className="text-sm font-medium text-foreground">Availability Status</p>
//                   <p className="text-xs text-muted-foreground mt-0.5">Toggle to show clients if you are available for bookings</p>
//                 </div>
//                 <div className="flex items-center gap-3">
//                   <span className={`text-sm font-medium ${displayData.isAvailable ? 'text-emerald-600' : 'text-muted-foreground'}`}>{displayData.isAvailable ? 'Online' : 'Offline'}</span>
//                   <button onClick={() => { if (isEditing) setEditForm(f => ({ ...f, isAvailable: !f.isAvailable })); else { setProfile(p => ({ ...p, isAvailable: !p.isAvailable })); showToast(`Status set to ${!profile.isAvailable ? 'Online' : 'Offline'}`); } }} className={`relative w-11 h-6 rounded-full transition-standard ${displayData.isAvailable ? 'bg-primary' : 'bg-border'}`}>
//                     <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-warm-sm transition-standard ${displayData.isAvailable ? 'translate-x-5' : 'translate-x-0'}`} />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Account Section */}
//           <div className="bg-card rounded-xl border border-border shadow-warm-sm overflow-hidden">
//             <div className="p-5 border-b border-border">
//               <h3 className="font-semibold text-foreground font-heading">Account Settings</h3>
//             </div>
//             <div className="p-5 space-y-4">
//               {/* Change Password */}
//               <div className="flex items-center justify-between p-4 rounded-lg border border-border">
//                 <div className="flex items-center gap-3">
//                   <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center">
//                     <Icon name="LockClosedIcon" size={16} variant="outline" className="text-muted-foreground" />
//                   </div>
//                   <div>
//                     <p className="text-sm font-medium text-foreground">Password</p>
//                     <p className="text-xs text-muted-foreground">Last changed 30 days ago</p>
//                   </div>
//                 </div>
//                 <button onClick={() => setIsPasswordModalOpen(true)} className="px-3 py-1.5 rounded-lg border border-border text-sm text-foreground hover:bg-muted transition-standard">Change</button>
//               </div>
//               {/* Verification Status */}
//               <div className="flex items-center justify-between p-4 rounded-lg border border-border">
//                 <div className="flex items-center gap-3">
//                   <div className="w-9 h-9 rounded-lg bg-emerald-50 flex items-center justify-center">
//                     <Icon name="ShieldCheckIcon" size={16} variant="outline" className="text-emerald-600" />
//                   </div>
//                   <div>
//                     <p className="text-sm font-medium text-foreground">Account Verification</p>
//                     <p className="text-xs text-muted-foreground">Identity verification status</p>
//                   </div>
//                 </div>
//                 <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${profile.verificationStatus === 'Verified' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>{profile.verificationStatus}</span>
//               </div>
//               {/* CBE Account */}
//               <div className="flex items-center justify-between p-4 rounded-lg border border-border">
//                 <div className="flex items-center gap-3">
//                   <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center">
//                     <Icon name="CreditCardIcon" size={16} variant="outline" className="text-blue-600" />
//                   </div>
//                   <div>
//                     <p className="text-sm font-medium text-foreground">CBE Payment Account</p>
//                     <p className="text-xs text-muted-foreground font-mono">{profile.cbeAccount}</p>
//                   </div>
//                 </div>
//                 <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700">Connected</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>

//       {/* Change Password Modal */}
//       {isPasswordModalOpen && (
//         <div className="fixed inset-0 bg-foreground/40 z-[200] flex items-center justify-center p-4" onClick={() => setIsPasswordModalOpen(false)}>
//           <div className="bg-card rounded-xl shadow-warm-xl w-full max-w-md" onClick={e => e.stopPropagation()}>
//             <div className="flex items-center justify-between p-5 border-b border-border">
//               <h2 className="text-lg font-bold font-heading text-foreground">Change Password</h2>
//               <button onClick={() => setIsPasswordModalOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-muted text-muted-foreground transition-standard">
//                 <Icon name="XMarkIcon" size={18} variant="outline" />
//               </button>
//             </div>
//             <div className="p-5 space-y-4">
//               {[
//                 { label: 'Current Password', key: 'current' as const },
//                 { label: 'New Password', key: 'newPass' as const },
//                 { label: 'Confirm New Password', key: 'confirm' as const },
//               ].map(field => (
//                 <div key={field.key}>
//                   <label className="block text-sm font-medium text-foreground mb-1.5">{field.label}</label>
//                   <input type="password" value={passwordForm[field.key]} onChange={e => setPasswordForm(f => ({ ...f, [field.key]: e.target.value }))} className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-standard" />
//                 </div>
//               ))}
//             </div>
//             <div className="flex items-center justify-end gap-3 p-5 border-t border-border">
//               <button onClick={() => setIsPasswordModalOpen(false)} className="px-4 py-2 rounded-lg border border-border text-sm text-foreground hover:bg-muted transition-standard">Cancel</button>
//               <button onClick={handlePasswordChange} className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-secondary transition-standard press-effect">Update Password</button>
//             </div>
//           </div>
//         </div>
//       )}

//     </div>
//   );
// }


// app/dashboard/tasker/profile/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { toast } from 'sonner';

// ────────────────────────────────────────────────
// Components
// ────────────────────────────────────────────────

import StatsGrid from '@/app/components/dashboard/tasker/profile/StatsGrid';

import ProfileHeaderCard from '@/app/components/dashboard/tasker/profile/ProfileHeaderCard';
import ProfessionalInfoCard from '@/app/components/dashboard/tasker/profile/WorkProfileCard';
import ProfileDetailCard from '@/app/components/dashboard/tasker/profile/ProfileDetailCard';
import AccountSettingsCard from '@/app/components/dashboard/tasker/profile/AccountSettingCard';
import ChangePasswordModal from '@/app/components/dashboard/tasker/profile/ChangePasswordModal';

// ────────────────────────────────────────────────
// Dummy data & types (you can later move to types.ts or api)
// ────────────────────────────────────────────────

type TaskerStatus = 'Approved' | 'Pending' | 'Suspended';
type VerificationStatus = 'Verified' | 'Unverified';

interface TaskerProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
  languages: string[];
  skills: string[];
  isAvailable: boolean;
  status: TaskerStatus;
  cbeAccount: string;
  verificationStatus: VerificationStatus;
}

const DUMMY_PROFILE: TaskerProfile = {
  firstName: 'Abebe',
  lastName: 'Kebede',
  email: 'abebe.kebede@example.com',
  phone: '+251 91 234 5678',
  location: 'Addis Ababa, Ethiopia',
  bio: 'Professional tasker with 5+ years of experience in home services. Specializing in cleaning, plumbing, and electrical work. Committed to delivering high-quality results.',
  languages: ['Amharic', 'English', 'Oromo'],
  skills: ['Deep Cleaning', 'Plumbing', 'Electrical Wiring', 'Painting', 'Carpentry'],
  isAvailable: true,
  status: 'Approved',
  cbeAccount: 'CBE-1000-2345-6789',
  verificationStatus: 'Verified',
};

const STATS = [
  { label: 'Total Jobs Completed', value: '47', icon: 'CheckBadgeIcon', color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { label: 'Total Earnings', value: '$4,280', icon: 'BanknotesIcon', color: 'text-blue-600', bg: 'bg-blue-50' },
  { label: 'Average Rating', value: '4.7', icon: 'StarIcon', color: 'text-amber-600', bg: 'bg-amber-50' },
  { label: 'Total Reviews', value: '38', icon: 'ChatBubbleLeftRightIcon', color: 'text-purple-600', bg: 'bg-purple-50' },
] as const;

// ────────────────────────────────────────────────
// Main Page
// ────────────────────────────────────────────────

export default function TaskerProfilePage() {
  const [isHydrated, setIsHydrated] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<TaskerProfile>(DUMMY_PROFILE);
  const [editForm, setEditForm] = useState<TaskerProfile>(DUMMY_PROFILE);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // ─── Handlers ─────────────────────────────────────

  const handleSaveProfile = () => {
    setProfile(editForm);
    setIsEditing(false);
    toast.success('Profile updated successfully');
  };

  const handleCancelEdit = () => {
    setEditForm({ ...profile });
    setIsEditing(false);
  };

  const startEditing = () => {
    setEditForm({ ...profile });
    setIsEditing(true);
  };

  const displayData = isEditing ? editForm : profile;

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-10 h-10 rounded-full border-4 border-primary border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-backgroun pb-">
      <main className=" max-w-5xl mx-auto px-1 py-6 lg:py- space-y-6 md:space-y-4">
        {/* Page Title */}
        <div className="space-y-1">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Profile</h1>
          <p className="text-muted-foreground">
            Manage your tasker profile, skills, availability and account settings
          </p>
        </div>

        {/* Header + Avatar + Basic Info */}
        <ProfileHeaderCard
          profile={displayData}
          isEditing={isEditing}
          onEditClick={startEditing}
        />

        {/* Stats */}
        <StatsGrid stats={STATS} />

        {/* Core Profile Information */}
        <ProfileDetailCard
          profile={displayData}
          isEditing={isEditing}
          editForm={editForm}
          setEditForm={setEditForm}
          onCancel={handleCancelEdit}
          onSave={handleSaveProfile}
        />

        {/* Skills, Resume, Availability */}
        <ProfessionalInfoCard
          profile={displayData}
          isEditing={isEditing}
          editForm={editForm}
          setEditForm={setEditForm}
        />

        {/* Account Settings */}
        <AccountSettingsCard
          profile={profile}
          onChangePassword={() => setIsPasswordModalOpen(true)}
        />
      </main>

      {/* Password Modal */}
      <ChangePasswordModal
        open={isPasswordModalOpen}
        onOpenChange={setIsPasswordModalOpen}
      />
    </div>
  );
}
