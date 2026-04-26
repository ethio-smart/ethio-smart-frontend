import DashboardInteractive from '@/app/components/dashboard/tasker/dashboard/DashboardInteractive';
import type { Metadata } from 'next';


export const metadata: Metadata = {
  title: 'Dashboard Overview - TaskrMetrics',
  description: 'Monitor your freelance business performance with real-time earnings analytics, booking pipeline, and key performance metrics.',
};

export default function DashboardOverviewPage() {
  return <DashboardInteractive />;
}