

import { User } from '@/app/types/types';
import Icon from '@/components/ui/AppIcon';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';






type ProfileHeaderCardProps= {
  user: User;
  // tasker?: TaskerProfile; 
  isEditing: boolean;
  onEditClick: () => void;
}



export default function ProfileHeaderCard({
  user,
  // tasker,
  isEditing,
  onEditClick,
}: ProfileHeaderCardProps) {
  const statusStyles = {
    Approved: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    Pending: 'bg-amber-50 text-amber-700 border-amber-200',
    Suspended: 'bg-red-50 text-red-700 border-red-200',
  };

  const initials = `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}`;

  return (
    <Card className="shadow-2xs">
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          
          {/* Avatar */}
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center text-3xl font-bold text-primary">
              {initials}
            </div>

            <Button
              size="icon"
              variant="secondary"
              className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full shadow-md"
            >
              <Icon name="CameraIcon" size={16} />
            </Button>
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0 space-y-2">
            <div className="flex flex-wrap items-center gap-3">
              
              <h2 className="text-2xl font-bold">
                {user.firstName} {user.lastName}
              </h2>

              {/*  Only render if tasker exists */}
              {user.tasker?.isVerified && (
                <Badge
                  className={`inline-flex px-3 py-1 rounded-full text-black text-sm font-medium border bg-secondary `}
                >
                  {user.tasker.status}
                </Badge>
              )}

              {/*verification badge */}
              {user.isVerified && (
                <span className="inline-flex items-center gap-1 text-xs text-blue-600">
                  <Icon name="CheckBadgeIcon" size={14} />
                  Verified
                </span>
              )}
            </div>

            {/* Contact Info */}
            <div className="space-y-1 text-sm text-muted-foreground">
              
              <div className="flex items-center gap-2">
                <Icon name="EnvelopeIcon" size={14} />
                {user.email}
              </div>

              {user.phone && (
                <div className="flex items-center gap-2">
                  <Icon name="PhoneIcon" size={14} />
                  {user.phone}
                </div>
              )}

              {user.tasker?.location && (
                <div className="flex items-center gap-2">
                  <Icon name="MapPinIcon" size={14} />
                  {user.tasker.location}
                </div>
              )}
            </div>
          </div>

          {/* Edit Button */}
          {!isEditing && (
            <Button onClick={onEditClick} className="gap-2">
              <Icon name="PencilIcon" size={16} />
              Edit Profile
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}