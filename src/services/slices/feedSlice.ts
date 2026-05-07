import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '../../utils/types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getFeedsApi, getOrdersApi } from '../../utils/burger-api';

type TFeedState = {
  orders: TOrder[];
  total: number;
  totalToday: number;
  isLoading: boolean;
  error: string | null;
};

type TFeedResponse = {
  orders: TOrder[];
  total: number;
  totalToday: number;
};

const initialState: TFeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  isLoading: false,
  error: null
};

export const fetchFeed = createAsyncThunk<TFeedResponse>(
  'feed/fetch',
  async () => {
    const res = await getFeedsApi();
    return res;
  }
);

export const fetchUserOrders = createAsyncThunk<TOrder[]>(
  'feed/fetchUserOrders',
  async () => {
    const res = await getOrdersApi();
    return res;
  }
);

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    setOrders(state, action: PayloadAction<TFeedResponse>) {
      state.orders = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeed.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFeed.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })
      .addCase(fetchFeed.rejected, (state) => {
        state.isLoading = false;
        state.error = 'Ошибка загрузки';
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
      });
  }
});

export const { setOrders } = feedSlice.actions;
export default feedSlice.reducer;
