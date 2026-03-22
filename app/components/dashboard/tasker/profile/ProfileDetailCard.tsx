
'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import  Icon  from '@/components/ui/AppIcon';
import { X } from 'lucide-react';

export interface TaskerProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
  languages: string[];
  skills: string[];
  isAvailable: boolean;
  status: 'Approved' | 'Pending' | 'Suspended';
  cbeAccount: string;
  verificationStatus: 'Verified' | 'Unverified';
}

interface ProfileDetailsCardProps {
  profile: TaskerProfile;
  isEditing: boolean;
  editForm: TaskerProfile;
  setEditForm: React.Dispatch<React.SetStateAction<TaskerProfile>>;
  onCancel: () => void;
  onSave: () => void;
}

export default function ProfileDetailCard({
  profile,
  isEditing,
  editForm,
  setEditForm,
  onCancel,
  onSave,
}: ProfileDetailsCardProps) {
  return (
    <Card className='shadow-2xs'>
      <CardHeader className="flex flex-row items-center justify-between border-b pb-4">
        <CardTitle>Profile Details</CardTitle>
        {isEditing && (
          <div className="flex gap-3">
            <Button variant="outline" size="sm" onClick={onCancel}>
              Cancel
            </Button>
            <Button size="sm" onClick={onSave}>
              Save Changes
            </Button>
          </div>
        )}
      </CardHeader>

      <CardContent className="pt-6 space-y-6">
        {/* Basic Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {[
            { label: 'First Name', key: 'firstName' },
            { label: 'Last Name', key: 'lastName' },
            { label: 'Email', key: 'email' },
            { label: 'Phone', key: 'phone' },
            { label: 'Location', key: 'location' },
          ].map((field) => (
            <div key={field.key} className="space-y-2">
              <Label className="text-xs font-medium text-muted-foreground">
                {field.label}
              </Label>
              {isEditing ? (
                <Input
                  value={editForm[field.key as keyof TaskerProfile] as string}
                  onChange={(e) =>
                    setEditForm((prev) => ({
                      ...prev,
                      [field.key]: e.target.value,
                    }))
                  }
                />
              ) : (
                <div className="px-3 py-2.5 bg-muted/50 rounded-md text-sm">
                  {profile[field.key as keyof TaskerProfile] as string}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bio */}
        <div className="space-y-2">
          <Label className="text-xs font-medium text-muted-foreground">Bio</Label>
          {isEditing ? (
            <Textarea
              value={editForm.bio}
              onChange={(e) =>
                setEditForm((prev) => ({ ...prev, bio: e.target.value }))
              }
              rows={4}
              className="resize-none"
            />
          ) : (
            <div className="px-3 py-2.5 bg-muted/50 rounded-md text-sm leading-relaxed whitespace-pre-line">
              {profile.bio || 'No bio provided.'}
            </div>
          )}
        </div>

        {/* Languages */}
        <div className="space-y-2">
          <Label className="text-xs font-medium text-muted-foreground">
            Languages Spoken
          </Label>
          <div className="flex flex-wrap gap-2">
            {(isEditing ? editForm.languages : profile.languages).map((lang) => (
              <div
                key={lang}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
              >
                {lang}
                {isEditing && (
                  <button
                    onClick={() =>
                      setEditForm((prev) => ({
                        ...prev,
                        languages: prev.languages.filter((l) => l !== lang),
                      }))
                    }
                    className="text-primary/70 hover:text-red-600"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            ))}

            {isEditing && (
              <div className="flex items-center gap-2">
                <Input
                  placeholder="Add language..."
                  className="w-36 h-8 text-sm"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      const val = (e.target as HTMLInputElement).value.trim();
                      if (val && !editForm.languages.includes(val)) {
                        setEditForm((prev) => ({
                          ...prev,
                          languages: [...prev.languages, val],
                        }));
                        (e.target as HTMLInputElement).value = '';
                      }
                    }
                  }}
                />
                <Button
                  size="icon"
                  variant="outline"
                  className="h-8 w-8"
                  onClick={() => {
                   
                  }}
                >
                  <Icon name="PlusIcon" size={16} />
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}