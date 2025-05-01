import { Suspense } from 'react'
import { Card } from '@/components/ui/card'
import { NetworkMetrics } from '@/components/dashboard/network-metrics'
import { Skeleton } from '@/components/ui/skeleton'
import { MetricCard } from '@/components/ui/metric-card'
import { InsightCard } from '@/components/ui/insight-card'
import { Activity, Users, TrendingUp, AlertCircle } from 'lucide-react'

export default function NetworkPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Network</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Stake"
          value="1.2B SOL"
          description="Across all validators"
          icon={<Activity className="h-6 w-6 text-primary" />}
        />
        <MetricCard
          title="Active Validators"
          value="1,500"
          description="Participating in consensus"
          icon={<Users className="h-6 w-6 text-primary" />}
        />
        <MetricCard
          title="Participation Rate"
          value="98.5%"
          description="Of total stake"
          icon={<TrendingUp className="h-6 w-6 text-primary" />}
        />
        <MetricCard
          title="Average Commission"
          value="5.2%"
          description="Across all validators"
          icon={<AlertCircle className="h-6 w-6 text-primary" />}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Suspense fallback={<Skeleton className="h-[400px]" />}>
          <Card className="p-6">
            <NetworkMetrics />
          </Card>
        </Suspense>

        <div className="space-y-6">
          <InsightCard
            title="Network Health"
            content="The Solana network is currently operating at peak efficiency with 99.9% uptime and optimal stake distribution."
          />
          <InsightCard
            title="Stake Distribution"
            content="Top 10 validators control 35% of total stake, indicating a healthy level of decentralization."
          />
          <InsightCard
            title="Performance Trends"
            content="Average validator performance has improved by 2.5% over the last 30 days."
          />
        </div>
      </div>
    </div>
  )
} 