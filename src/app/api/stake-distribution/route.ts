import { NextResponse } from 'next/server'
import { Connection } from '@solana/web3.js'

const HELIUS_RPC_URL = 'https://mainnet.helius-rpc.com/?api-key=e9da4d44-a44e-4b29-b9cb-d45004109355'
const connection = new Connection(HELIUS_RPC_URL)

export async function GET() {
  try {
    const validators = await connection.getVoteAccounts()
    
    // Group validators by stake ranges
    const stakeRanges = [
      { name: '0-100K SOL', min: 0, max: 100000 },
      { name: '100K-500K SOL', min: 100000, max: 500000 },
      { name: '500K-1M SOL', min: 500000, max: 1000000 },
      { name: '1M-5M SOL', min: 1000000, max: 5000000 },
      { name: '5M+ SOL', min: 5000000, max: Infinity },
    ]

    const distribution = stakeRanges.map(range => {
      const validatorsInRange = validators.current.filter(v => {
        const stake = v.activatedStake / 1e9 // Convert lamports to SOL
        return stake >= range.min && stake < range.max
      })

      return {
        name: range.name,
        value: validatorsInRange.length,
      }
    })

    return NextResponse.json(distribution)
  } catch (error) {
    console.error('Error fetching stake distribution:', error)
    return NextResponse.json(
      { error: 'Failed to fetch stake distribution' },
      { status: 500 }
    )
  }
} 