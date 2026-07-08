

'use client';

import { User } from '@/app/types/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { X } from 'lucide-react';



export interface TaskerDetails {
  bio?: string | null;
  languages?: string[];
}

interface Props {
  user: User;
  tasker?: TaskerDetails;
  isEditing: boolean;
  editUser: User;
  setEditUser: React.Dispatch<React.SetStateAction<User>>;
  editTasker?: TaskerDetails;
  setEditTasker?: React.Dispatch<React.SetStateAction<TaskerDetails | undefined>>;
  onCancel: () => void;
  onSave: () => void;
}

export default function ProfileDetailCard({
  user,
  tasker,

  isEditing,

  editUser,
  setEditUser,

  editTasker,
  setEditTasker,

  onCancel,
  onSave,
}: Props) {
  const basicFields = [
    { label: 'First Name', key: 'firstName' },
    { label: 'Last Name', key: 'lastName' },
    { label: 'Email', key: 'email' },
    { label: 'Phone', key: 'phone' },
  ] as const;

  return (
    <Card className="shadow-2xs">
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
        
        {/*  USER FIELDS  */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {basicFields.map((field) => (
            <div key={field.key} className="space-y-2">
              <Label className="text-xs text-muted-foreground">
                {field.label}
              </Label>

              {isEditing ? (
                <Input
                  value={String(editUser[field.key as keyof User] || '')}
                  onChange={(e) =>
                    setEditUser((prev) => ({
                      ...prev,
                      [field.key]: e.target.value,
                    }))
                  }
                />
              ) : (
                <div className="px-3 py-2.5 bg-muted/50 rounded-md text-sm">
                  {String(user[field.key as keyof User] || 'N/A')}
                </div>
              )}
            </div>
          ))}
        </div>

       {/* tasker bio */}
        {tasker && (
          <>
            {/* Bio */}
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">Bio</Label>

              {isEditing ? (
                <Textarea
                  value={editTasker?.bio || ''}
                  onChange={(e) =>
                    setEditTasker?.((prev) => ({
                      ...prev!,
                      bio: e.target.value,
                    }))
                  }
                  rows={4}
                  className="resize-none"
                />
              ) : (
                <div className="px-3 py-2.5 bg-muted/50 rounded-md text-sm">
                  {tasker.bio || 'No bio provided.'}
                </div>
              )}
            </div>

            {/* Languages */}
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">
                Languages Spoken
              </Label>

              <div className="flex flex-wrap gap-2">
                {(isEditing
                  ? editTasker?.languages || []
                  : tasker.languages || []
                ).map((lang) => (
                  <div
                    key={lang}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-xs"
                  >
                    {lang}

                    {isEditing && (
                      <button
                        onClick={() =>
                          setEditTasker?.((prev) => ({
                            ...prev!,
                            languages:
                              prev?.languages?.filter((l) => l !== lang) || [],
                          }))
                        }
                      >
                        <X size={14} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}