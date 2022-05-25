import * as anchor from '@project-serum/anchor'
import { Float } from '@solana/buffer-layout'
import { clusterApiUrl } from '@solana/web3.js'

import { IDL } from './idl'

export const DEFAULT_COMMITMENT = 'confirmed'
export const DEFAULT_CLUSTER = 'devnet'
export const PROGRAM_ADDRESS = new anchor.web3.PublicKey(
  '8puemcedQN8kgr5V4WtkExzGXoNpBvMqqkMyfcF9JfGW',
)
export const NODE_URL = clusterApiUrl(DEFAULT_CLUSTER)

export type RoundData = {
  address: string
  mint: string
  startTimestamp: number
  lockTimestamp: number
  closeTimestamp: number

  lockPrice: number
  closePrice: number
  epoch: number
  totalAmount: number
  upAmount: number
  downAmount: number
  rewardBaseCalAmount: number
  rewardAmount: number

  payoutUp: number
  payoutDown: number

  cardState: string
  cardDuration: number
}

export type BallotData = {
  address: string,
  round: string,
  authority: string,
  amount: number,
  // 1 - up, 2 - down
  pos: number,
  // 0 - not claimed, 1 - claimed
  claimed: number,
}

// Function support
export const getProvider = (wallet: any) => {
  const connection = new anchor.web3.Connection(NODE_URL, DEFAULT_COMMITMENT)
  return new anchor.AnchorProvider(connection, wallet, {
    preflightCommitment: DEFAULT_COMMITMENT,
  })
}

export const getProgram = (wallet: any) => {
  const provider = getProvider(wallet)
  return new anchor.Program(IDL, PROGRAM_ADDRESS, provider)
}
