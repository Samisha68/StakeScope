import { NextResponse } from 'next/server'
import { Connection } from '@solana/web3.js'

if (!process.env.HELIUS_RPC_URL) {
  throw new Error('HELIUS_RPC_URL environment variable is not set')
}

const connection = new Connection(process.env.HELIUS_RPC_URL)

export async function GET() {
  try {
    const validators = await connection.getVoteAccounts()
    
    // Calculate average performance metrics
    const performanceData = validators.current.map(validator => {
      // Calculate uptime based on epoch credits
      const epochCredits = validator.epochCredits
      const currentEpochCredits = epochCredits[0][1]
      const previousEpochCredits = epochCredits[1] ? epochCredits[1][1] : 0
      const uptime = ((currentEpochCredits - previousEpochCredits) / 432000) * 100 // Assuming 432000 slots per epoch

      return {
        uptime: Math.min(100, Math.max(0, uptime)).toFixed(2), // Clamp between 0 and 100
        voteCredits: currentEpochCredits,
      }
    })

    // Calculate averages
    const averageUptime = performanceData.reduce((acc, curr) => acc + parseFloat(curr.uptime), 0) / performanceData.length
    const averageVoteCredits = performanceData.reduce((acc, curr) => acc + curr.voteCredits, 0) / performanceData.length

    // Generate time series data (last 24 hours)
    const timeSeriesData = Array.from({ length: 24 }, (_, i) => {
      const hour = new Date()
      hour.setHours(hour.getHours() - (23 - i))
      
      return {
        time: hour.toLocaleTimeString(),
        uptime: (averageUptime * (1 + Math.random() * 0.1 - 0.05)).toFixed(2), // Add some random variation
        voteCredits: Math.floor(averageVoteCredits * (1 + Math.random() * 0.1 - 0.05)), // Add some random variation
      }
    })

    return NextResponse.json(timeSeriesData)
  } catch (error) {
    console.error('Error fetching validator performance:', error)
    return NextResponse.json(
      { error: 'Failed to fetch validator performance' },
      { status: 500 }
    )
  }
} 