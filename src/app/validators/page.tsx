import { Suspense } from 'react'
import { Card } from '@/components/ui/card'
import { ValidatorLeaderboard } from '@/components/dashboard/validator-leaderboard'
import { ValidatorPerformance } from '@/components/dashboard/validator-performance'
import { StakeDistribution } from '@/components/dashboard/stake-distribution'
import { Skeleton } from '@/components/ui/skeleton'
import { InsightCard } from '@/components/ui/insight-card'
import { MetricCard } from '@/components/ui/metric-card'
import { Award, Clock, TrendingUp, Users } from 'lucide-react'

export default function ValidatorsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Validators</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Top Validator"
          value="99.9%"
          description="Uptime performance"
          icon={<Award className="h-6 w-6 text-primary" />}
        />
        <MetricCard
          title="Average Uptime"
          value="99.5%"
          description="Across all validators"
          icon={<Clock className="h-6 w-6 text-primary" />}
        />
        <MetricCard
          title="Performance"
          value="98.8%"
          description="Vote success rate"
          icon={<TrendingUp className="h-6 w-6 text-primary" />}
        />
        <MetricCard
          title="Active Stakers"
          value="45,000"
          description="Across all validators"
          icon={<Users className="h-6 w-6 text-primary" />}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Suspense fallback={<Skeleton className="h-[400px]" />}>
          <Card className="p-6">
            <ValidatorLeaderboard />
          </Card>
        </Suspense>

        <Suspense fallback={<Skeleton className="h-[400px]" />}>
          <Card className="p-6">
            <ValidatorPerformance />
          </Card>
        </Suspense>

        <Suspense fallback={<Skeleton className="h-[400px]" />}>
          <Card className="p-6">
            <StakeDistribution />
          </Card>
        </Suspense>

        <div className="space-y-6">
          <InsightCard
            title="Validator Insights"
            content="Top performing validators maintain an average uptime of 99.9% with optimal stake distribution."
          />
          <InsightCard
            title="Performance Trends"
            content="Validator performance has shown consistent improvement over the last 30 days."
          />
          <InsightCard
            title="Stake Distribution"
            content="The network shows healthy stake distribution with no single validator controlling more than 5% of total stake."
          />
        </div>
      </div>
    </div>
  )
} 