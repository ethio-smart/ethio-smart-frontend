'use client';
import Icon from '@/components/ui/AppIcon';

interface CardProps {
  label: string;
  value: string;
  icon: string;
  color: string;
  bg: string;
  desc: string;
}

export const TransactionCard = ({ cards }: { cards: CardProps[] }) => (
  <div className="grid lg:grid-cols-3 grid-cols-1 gap-4">
    {cards.map(card => (
      <div key={card.label} className="bg-card rounded-xl border border-border shadow-sm p-5">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{card.label}</p>
            <p className="text-2xl font-bold font-mono text-foreground mt-1">{card.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{card.desc}</p>
          </div>
          <div className={`w-10 h-10 rounded-lg ${card.bg} flex items-center justify-center`}>
            <Icon name={card.icon as any} size={20} variant="outline" className={card.color} />
          </div>
        </div>
      </div>
    ))}
  </div>
);