import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { BallotData } from 'config'

export type RoundsState = Record<string, BallotData>

const initialState: RoundsState = {}

export const ballotSlice = createSlice({
  name: 'ballots',
  initialState,
  reducers: {
    setBallot: (state, action: PayloadAction<BallotData>) => {
      state[action.payload.address] = action.payload
      return state
    },
  },
})

export const { setBallot } = ballotSlice.actions

export default ballotSlice.reducer
