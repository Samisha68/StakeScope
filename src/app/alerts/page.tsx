import { useMemo } from 'react'
import { Card } from '@/components/ui/card'
import { MetricCard } from '@/components/ui/metric-card'
import { InsightCard } from '@/components/ui/insight-card'
import { Bell, AlertTriangle, CheckCircle, Clock } from 'lucide-react'

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function generateMockAlerts() {
  const lowUptimeCount = getRandomInt(1, 5)
  const newZeroCommission = Math.random() > 0.5
  const redistribution = Math.random() > 0.5
  const alerts = []

  if (lowUptimeCount > 0) {
    alerts.push({
      type: 'critical',
      title: `${lowUptimeCount} validator${lowUptimeCount > 1 ? 's' : ''} below 95% uptime`,
      description: `${lowUptimeCount} validator${lowUptimeCount > 1 ? 's have' : ' has'} recently dropped below 95% uptime.`,
      icon: <AlertTriangle className="h-5 w-5 text-yellow-500" />,
      time: `${getRandomInt(1, 6)} hours ago`,
    })
  }
  if (newZeroCommission) {
    alerts.push({
      type: 'info',
      title: 'New 0% Commission Validator',
      description: `Validator 0x${getRandomInt(1000,9999).toString(16)}... joined with 0% commission.`,
      icon: <CheckCircle className="h-5 w-5 text-green-500" />,
      time: `${getRandomInt(1, 12)} hours ago`,
    })
  }
  if (redistribution) {
    alerts.push({
      type: 'recommend',
      title: 'Stake Redistribution Recommended',
      description: 'Stake redistribution is recommended to maintain decentralization.',
      icon: <Bell className="h-5 w-5 text-primary" />,
      time: `${getRandomInt(1, 24)} hours ago`,
    })
  }
  return alerts
}

export default function AlertsPage() {
  // Generate new mock alerts on each render
  const alerts = useMemo(() => generateMockAlerts(), [])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Alerts</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Active Alerts"
          value={alerts.length.toString()}
          description="Requiring attention"
          icon={<Bell className="h-6 w-6 text-primary" />}
        />
        <MetricCard
          title="Critical"
          value={alerts.filter(a => a.type === 'critical').length.toString()}
          description="High priority"
          icon={<AlertTriangle className="h-6 w-6 text-red-500" />}
        />
        <MetricCard
          title="Resolved"
          value={getRandomInt(10, 20).toString()}
          description="Last 24 hours"
          icon={<CheckCircle className="h-6 w-6 text-green-500" />}
        />
        <MetricCard
          title="Response Time"
          value={`${getRandomInt(2, 10)}m`}
          description="Average"
          icon={<Clock className="h-6 w-6 text-primary" />}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-6">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Active Alerts</h2>
            <div className="space-y-4">
              {alerts.length === 0 && (
                <div className="rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-900 dark:bg-green-950">
                  <div className="flex items-start gap-4">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <div>
                      <h3 className="font-medium text-green-900 dark:text-green-100">No Active Alerts</h3>
                      <p className="mt-1 text-sm text-green-700 dark:text-green-300">
                        All validators are healthy.
                      </p>
                    </div>
                  </div>
                </div>
              )}
              {alerts.map((alert, idx) => (
                <div
                  key={idx}
                  className="rounded-lg border border-yellow-200 bg-yellow-50 p-4 dark:border-yellow-900 dark:bg-yellow-950"
                >
                  <div className="flex items-start gap-4">
                    {alert.icon}
                    <div>
                      <h3 className="font-medium text-yellow-900 dark:text-yellow-100">{alert.title}</h3>
                      <p className="mt-1 text-sm text-yellow-700 dark:text-yellow-300">{alert.description}</p>
                      <p className="mt-2 text-xs text-yellow-600 dark:text-yellow-400">{alert.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Alert History</h2>
            <div className="space-y-4">
              <div className="rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-900 dark:bg-green-950">
                <div className="flex items-start gap-4">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <div>
                    <h3 className="font-medium text-green-900 dark:text-green-100">Resolved: High Latency</h3>
                    <p className="mt-1 text-sm text-green-700 dark:text-green-300">
                      Validator 0x9abc... latency normalized
                    </p>
                    <p className="mt-2 text-xs text-green-600 dark:text-green-400">1 day ago</p>
                  </div>
                </div>
              </div>
              <div className="rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-900 dark:bg-green-950">
                <div className="flex items-start gap-4">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <div>
                    <h3 className="font-medium text-green-900 dark:text-green-100">Resolved: Stake Drop</h3>
                    <p className="mt-1 text-sm text-green-700 dark:text-green-300">
                      Validator 0xdef0... stake restored
                    </p>
                    <p className="mt-2 text-xs text-green-600 dark:text-green-400">2 days ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <div className="space-y-6">
          <InsightCard
            title="Alert Trends"
            content="Most alerts are related to validator performance, commission changes, and decentralization recommendations."
          />
          <InsightCard
            title="Response Time"
            content="Average response time to critical alerts is under 10 minutes."
          />
          <InsightCard
            title="Resolution Rate"
            content="95% of alerts are resolved within 24 hours."
          />
        </div>
      </div>
    </div>
  )
} 