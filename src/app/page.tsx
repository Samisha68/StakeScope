import { DashboardHeader } from '@/components/dashboard/header'
import { DashboardLayout } from '@/components/dashboard/layout'
import { StakeDistribution } from '@/components/dashboard/stake-distribution'
import { ValidatorPerformance } from '@/components/dashboard/validator-performance'
import { NetworkMetrics } from '@/components/dashboard/network-metrics'
import { ValidatorLeaderboard } from '@/components/dashboard/validator-leaderboard'

export default function Home() {
  return (
    <DashboardLayout>
      <DashboardHeader />
      <main className="flex-1 space-y-6 p-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <NetworkMetrics />
          <StakeDistribution />
          <ValidatorPerformance />
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <ValidatorLeaderboard />
        </div>
      </main>
    </DashboardLayout>
  )
}
