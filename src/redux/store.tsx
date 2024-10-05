import { configureStore } from '@reduxjs/toolkit';
import newsReducer from './newsSlice'; // Adjust the path as needed

// Create a Redux store
const store = configureStore({
  reducer: {
    news: newsReducer,
  },
});

// Define RootState type based on the store's state
export type RootState = ReturnType<typeof store.getState>;

// Define AppDispatch type
export type AppDispatch = typeof store.dispatch;

export default store;
