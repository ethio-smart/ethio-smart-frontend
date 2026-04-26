'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpenText, CalendarClock, FileText, Tags } from 'lucide-react';

export default function CategoryStats({
  total,
  filtered,
  latestName,
  latestDate,
  averageDescriptionLength,
}: {
  total: number;
  filtered: number;
  latestName: string;
  latestDate: string;
  averageDescriptionLength: number;
}) {
  const cards = [
    {
      label: 'Total Categories',
      value: total,
      icon: Tags,
      helper: 'From the backend response',
    },
    {
      label: 'Visible After Search',
      value: filtered,
      icon: FileText,
      helper: 'Matches current filters',
    },
    {
      label: 'Latest Category',
      value: latestName,
      icon: CalendarClock,
      helper: latestDate,
    },
    {
      label: 'Avg. Description Length',
      value: averageDescriptionLength,
      icon: BookOpenText,
      helper: 'Characters per category',
    },
  ] as const;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <Card key={card.label} className="border-border shadow-sm">
            <CardContent className="p-4">
              <div className="mb-3 flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm text-muted-foreground">{card.label}</p>
                  <p className="mt-1 text-2xl font-semibold text-foreground">
                    {card.value}
                  </p>
                </div>
                <div className="rounded-lg bg-primary/10 p-2 text-primary">
                  <Icon className="size-4" />
                </div>
              </div>
              <Badge variant="outline" className="text-xs font-normal">
                {card.helper}
              </Badge>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
