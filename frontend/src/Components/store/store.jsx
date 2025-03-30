import { configureStore } from '@reduxjs/toolkit'
import textReducer from './TextSlice'

export const store = configureStore({
  reducer: {
    text: textReducer,
  },
});

export default store;