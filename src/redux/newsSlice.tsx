// src/redux/newsSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const apiKey = '87ffefb85832433eb8aaa2a952ab7016'; // Your NewsAPI key

// Create async thunk for fetching top headlines
export const fetchTopHeadlines = createAsyncThunk('news/fetchTopHeadlines', async () => {
  const response = await axios.get('https://newsapi.org/v2/top-headlines', {
    params: {
      apiKey,
      country: 'us', // You can change this to fetch news from a different country
      pageSize: 9, // Number of articles
    },
  });
  return response.data.articles;
});

// Create async thunk for searching news
export const fetchNewsBySearch = createAsyncThunk('news/fetchNewsBySearch', async (query: string) => {
  const response = await axios.get('https://newsapi.org/v2/everything', {
    params: {
      apiKey,
      q: query,
      pageSize: 9, // Number of articles
    },
  });
  return response.data.articles;
});

// Create a news slice
const newsSlice = createSlice({
  name: 'news',
  initialState: {
    articles: [],
    loading: false,
    error: '',
  },
  reducers: {
    clearError(state) {
      state.error = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopHeadlines.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(fetchTopHeadlines.fulfilled, (state, action) => {
        state.loading = false;
        state.articles = action.payload;
      })
      .addCase(fetchTopHeadlines.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch news';
      })
      .addCase(fetchNewsBySearch.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(fetchNewsBySearch.fulfilled, (state, action) => {
        state.loading = false;
        state.articles = action.payload;
      })
      .addCase(fetchNewsBySearch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch news';
      });
  },
});

// Export actions and reducer
export const { clearError } = newsSlice.actions;
export default newsSlice.reducer;
