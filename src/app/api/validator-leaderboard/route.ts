import { NextResponse } from 'next/server'
import { Connection } from '@solana/web3.js'

if (!process.env.HELIUS_RPC_URL) {
  throw new Error('HELIUS_RPC_URL environment variable is not set')
}

const connection = new Connection(process.env.HELIUS_RPC_URL)

export async function GET() {
  try {
    const validators = await connection.getVoteAccounts()
    
    // Sort validators by stake
    const sortedValidators = validators.current
      .sort((a, b) => b.activatedStake - a.activatedStake)
      .slice(0, 10) // Get top 10 validators
      .map(validator => ({
        address: validator.nodePubkey,
        name: `Validator ${validator.nodePubkey.slice(0, 4)}...${validator.nodePubkey.slice(-4)}`,
        stake: validator.activatedStake / 1e9, // Convert lamports to SOL
        commission: validator.commission,
        voteCredits: validator.epochCredits[0][1],
        lastVote: validator.lastVote,
      }))

    return NextResponse.json(sortedValidators)
  } catch (error) {
    console.error('Error fetching validator leaderboard:', error)
    return NextResponse.json(
      { error: 'Failed to fetch validator leaderboard' },
      { status: 500 }
    )
  }
} 