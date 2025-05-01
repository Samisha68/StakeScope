'use client'

import { useQuery } from '@tanstack/react-query'
import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

async function fetchValidatorPerformance() {
  const response = await fetch('/api/validator-performance')
  if (!response.ok) {
    throw new Error('Failed to fetch validator performance')
  }
  return response.json()
}

export function ValidatorPerformance() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['validatorPerformance'],
    queryFn: fetchValidatorPerformance,
    refetchInterval: 60000, // Refetch every minute
  })

  if (error) {
    return (
      <Card className="p-6">
        <div className="text-red-500">Error loading validator performance</div>
      </Card>
    )
  }

  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Validator Performance</h2>
      <div className="mt-4 h-64">
        {isLoading ? (
          <Skeleton className="h-full w-full" />
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="uptime"
                stroke="#0088FE"
                name="Uptime"
              />
              <Line
                type="monotone"
                dataKey="voteCredits"
                stroke="#00C49F"
                name="Vote Credits"
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </Card>
  )
} 