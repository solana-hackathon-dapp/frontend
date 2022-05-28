import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RoundData } from 'config'

export type RoundsState = Record<string, RoundData>

const initialState: RoundsState = {}

export const roundSlice = createSlice({
  name: 'rounds',
  initialState,
  reducers: {
    setRound: (state, action: PayloadAction<RoundData>) => {
      state[action.payload.epoch] = action.payload
      return state
    },
  },
})

export const { setRound } = roundSlice.actions

export default roundSlice.reducer
