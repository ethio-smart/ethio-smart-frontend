

'use client';

import { Tasker } from '@/app/types/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { X } from 'lucide-react';
import { LuImage } from 'react-icons/lu';



interface Props {
  tasker: Tasker;

  isEditing: boolean;

  editTasker: Tasker;
  setEditTasker: React.Dispatch<React.SetStateAction<Tasker>>;
}

export default function ProfessionalInfoCard({
  tasker,
  isEditing,
  editTasker,
  setEditTasker,
}: Props) {
  const displayedSkills = isEditing ? editTasker.certifications : tasker.certifications;

  return (
    <Card className="shadow-2xs">
      <CardHeader className="border-b">
        <CardTitle>Professional Info</CardTitle>
      </CardHeader>

      <CardContent className="pt-6 space-y-6">

        {/* Upload Section */}
        <div className="space-y-2">
          <Label>
            Upload certifications, work samples, or documents to build trust.
          </Label>

          <Label
            htmlFor="file"
            className="flex items-center justify-center gap-2 border border-gray-500 bg-gray-50 rounded-lg py-6 cursor-pointer hover:bg-black/5"
          >
            <LuImage size={18} className="text-gray-500" />
            <span className="text-sm font-medium text-gray-500">
              Upload Images
            </span>
          </Label>

          <Input id="file" type="file" multiple className="hidden" />
        </div>

        {/* Skills */}
        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground">Skills</Label>

          <div className="flex flex-wrap gap-2">
            {displayedSkills.map((skill) => (
              <div
                key={skill}
                className="inline-flex items-center gap-1 px-3 py-1 bg-muted rounded-full text-sm"
              >
                {skill}

                {isEditing && (
                  <button
                    onClick={() =>
                      setEditTasker((prev) => ({
                        ...prev,
                        certifications: prev.certifications.filter((s) => s !== skill),
                      }))
                    }
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            ))}

            {isEditing && (
              <Input
                placeholder="Add certification..."
                className="w-32 h-8 text-sm"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    const val = (e.target as HTMLInputElement).value.trim();

                    if (val && !editTasker.certifications.includes(val)) {
                      setEditTasker((prev) => ({
                        ...prev,
                        certifications: [...prev.certifications, val],
                      }));
                      (e.target as HTMLInputElement).value = '';
                    }
                  }
                }}
              />
            )}
          </div>
        </div>

        {/* Availability */}
        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div>
            <p className="text-sm font-medium">Availability Status</p>
            <p className="text-xs text-muted-foreground">
              Show clients when you're available
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span
              className={`text-sm ${
                (isEditing ? editTasker.availability : tasker.availability)
                  ? 'text-emerald-600'
                  : 'text-muted-foreground'
              }`}
            >
              {(isEditing ? editTasker.availability : tasker.availability)
                ? 'Online'
                : 'Offline'}
            </span>

            <Switch
              checked={
                isEditing ? editTasker.availability : tasker.availability
              }
              onCheckedChange={(checked) =>
                isEditing &&
                setEditTasker((prev) => ({
                  ...prev,
                  availability: checked,
                }))
              }
              disabled={!isEditing}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}