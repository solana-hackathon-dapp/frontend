import { configureStore } from '@reduxjs/toolkit'

import walletReducer from './wallet.reducer'
import rounds from './rounds.reducer'

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  reducer: {
    wallet: walletReducer,
    rounds,
  },
})

export type AppState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
