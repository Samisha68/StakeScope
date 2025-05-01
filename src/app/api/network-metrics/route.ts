import { NextResponse } from 'next/server'
import { Connection } from '@solana/web3.js'

if (!process.env.HELIUS_RPC_URL) {
  throw new Error('HELIUS_RPC_URL environment variable is not set')
}

const connection = new Connection(process.env.HELIUS_RPC_URL)

export async function GET() {
  try {
    // Fetch total stake
    const totalStake = await connection.getSupply()
    const totalStakeInSol = totalStake.value.total / 1e9

    // Fetch active validators
    const validators = await connection.getVoteAccounts()
    const activeValidators = validators.current.length

    // Calculate participation rate
    const participationRate = (activeValidators / 1000) * 100 // Assuming 1000 is the target number of validators

    // Calculate average commission
    const totalCommission = validators.current.reduce((acc, validator) => acc + validator.commission, 0)
    const averageCommission = totalCommission / activeValidators

    return NextResponse.json({
      totalStake: totalStakeInSol,
      activeValidators,
      participationRate: participationRate.toFixed(2),
      averageCommission: averageCommission.toFixed(2),
    })
  } catch (error) {
    console.error('Error fetching network metrics:', error)
    return NextResponse.json(
      { error: 'Failed to fetch network metrics' },
      { status: 500 }
    )
  }
} 