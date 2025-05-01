'use client'

import { useQuery } from '@tanstack/react-query'
import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, ArrowUpDown, Copy, Check } from 'lucide-react'
import { toast } from 'sonner'

type SortField = 'stake' | 'uptime' | 'commission'
type SortOrder = 'asc' | 'desc'

interface Validator {
  address: string
  name: string
  stake: number
  commission: number
  voteCredits: number
  lastVote: number
}

async function fetchValidatorLeaderboard() {
  const response = await fetch('/api/validator-leaderboard')
  if (!response.ok) {
    throw new Error('Failed to fetch validator leaderboard')
  }
  return response.json()
}

export function ValidatorLeaderboard() {
  const { data, isLoading, error } = useQuery<Validator[]>({
    queryKey: ['validatorLeaderboard'],
    queryFn: fetchValidatorLeaderboard,
    refetchInterval: 60000, // Refetch every minute
  })

  const [searchQuery, setSearchQuery] = useState('')
  const [sortField, setSortField] = useState<SortField>('stake')
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc')
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null)

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortOrder('desc')
    }
  }

  const copyAddress = async (address: string) => {
    try {
      await navigator.clipboard.writeText(address)
      setCopiedAddress(address)
      toast.success('Address copied to clipboard')
      setTimeout(() => setCopiedAddress(null), 2000)
    } catch (err) {
      toast.error('Failed to copy address')
    }
  }

  if (error) {
    return (
      <Card className="p-6">
        <div className="text-red-500">Error loading validator leaderboard</div>
      </Card>
    )
  }

  const filteredData = data?.filter((validator) =>
    validator.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    validator.address.toLowerCase().includes(searchQuery.toLowerCase())
  ) || []

  const sortedData = [...filteredData].sort((a, b) => {
    const multiplier = sortOrder === 'asc' ? 1 : -1
    if (sortField === 'stake') {
      return (a.stake - b.stake) * multiplier
    }
    if (sortField === 'commission') {
      return (a.commission - b.commission) * multiplier
    }
    return 0
  })

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Top Validators</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search validators..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>
      <div className="mt-4">
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                    Rank
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                    Validator
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400 cursor-pointer hover:text-primary"
                    onClick={() => handleSort('stake')}
                  >
                    <div className="flex items-center gap-2">
                      Stake
                      <ArrowUpDown className="h-4 w-4" />
                    </div>
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400 cursor-pointer hover:text-primary"
                    onClick={() => handleSort('commission')}
                  >
                    <div className="flex items-center gap-2">
                      Commission
                      <ArrowUpDown className="h-4 w-4" />
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {sortedData.map((validator, index) => (
                  <motion.tr
                    key={validator.address}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800/50"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      <div className="flex items-center gap-2">
                        <span>{validator.name}</span>
                        <button
                          onClick={() => copyAddress(validator.address)}
                          className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                        >
                          {copiedAddress === validator.address ? (
                            <Check className="h-4 w-4 text-green-500" />
                          ) : (
                            <Copy className="h-4 w-4 text-gray-400 hover:text-primary" />
                          )}
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {validator.stake.toLocaleString()} SOL
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {validator.commission}%
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Card>
  )
} 