'use client'

import { useQuery } from '@tanstack/react-query'
import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import CountUp from 'react-countup'
import { motion } from 'framer-motion'

async function fetchNetworkMetrics() {
  const response = await fetch('/api/network-metrics')
  if (!response.ok) {
    throw new Error('Failed to fetch network metrics')
  }
  return response.json()
}

function formatToMillions(value: number): string {
  return (value / 1000000).toFixed(2)
}

export function NetworkMetrics() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['networkMetrics'],
    queryFn: fetchNetworkMetrics,
    refetchInterval: 60000, // Refetch every minute
  })

  if (error) {
    return (
      <Card className="p-6">
        <div className="text-red-500">Error loading network metrics</div>
      </Card>
    )
  }

  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Network Metrics</h2>
      <div className="mt-4 grid grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-sm text-gray-500 dark:text-gray-400">Total Stake</p>
          {isLoading ? (
            <Skeleton className="h-8 w-32" />
          ) : (
            <p className="text-2xl font-semibold text-gray-900 dark:text-white">
              <CountUp
                end={data?.totalStake || 0}
                duration={2.5}
                separator=","
                decimals={2}
                suffix=" SOL"
                formattingFn={formatToMillions}
              />
            </p>
          )}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <p className="text-sm text-gray-500 dark:text-gray-400">Active Validators</p>
          {isLoading ? (
            <Skeleton className="h-8 w-32" />
          ) : (
            <p className="text-2xl font-semibold text-gray-900 dark:text-white">
              <CountUp
                end={data?.activeValidators || 0}
                duration={2.5}
                separator=","
              />
            </p>
          )}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <p className="text-sm text-gray-500 dark:text-gray-400">Network Participation</p>
          {isLoading ? (
            <Skeleton className="h-8 w-32" />
          ) : (
            <p className="text-2xl font-semibold text-gray-900 dark:text-white">
              <CountUp
                end={parseFloat(data?.participationRate) || 0}
                duration={2.5}
                decimals={2}
                suffix="%"
              />
            </p>
          )}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p className="text-sm text-gray-500 dark:text-gray-400">Average Commission</p>
          {isLoading ? (
            <Skeleton className="h-8 w-32" />
          ) : (
            <p className="text-2xl font-semibold text-gray-900 dark:text-white">
              <CountUp
                end={parseFloat(data?.averageCommission) || 0}
                duration={2.5}
                decimals={2}
                suffix="%"
              />
            </p>
          )}
        </motion.div>
      </div>
    </Card>
  )
} 