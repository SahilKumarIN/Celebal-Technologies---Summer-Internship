import { configureStore } from '@reduxjs/toolkit';
import musicReducer from './slices/musicSlice';
import playerReducer from './slices/playerSlice';

export const store = configureStore({
  reducer: {
    music: musicReducer,
    player: playerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;