'use client'

import { useQuery } from '@tanstack/react-query'
import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from 'recharts'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8']

async function fetchStakeDistribution() {
  const response = await fetch('/api/stake-distribution')
  if (!response.ok) {
    throw new Error('Failed to fetch stake distribution')
  }
  return response.json()
}

export function StakeDistribution() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['stakeDistribution'],
    queryFn: fetchStakeDistribution,
    refetchInterval: 60000, // Refetch every minute
  })

  if (error) {
    return (
      <Card className="p-6">
        <div className="text-red-500">Error loading stake distribution</div>
      </Card>
    )
  }

  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Stake Distribution</h2>
      <div className="mt-4 h-64">
        {isLoading ? (
          <Skeleton className="h-full w-full" />
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {data?.map((entry: any, index: number) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
    </Card>
  )
} 