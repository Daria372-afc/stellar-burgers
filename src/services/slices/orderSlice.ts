import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { orderBurgerApi } from '../../utils/burger-api';
import { getOrderByNumberApi } from '../../utils/burger-api';
import { TOrder } from '../../utils/types';

type TOrderState = {
  orderData: TOrder | null;
  isLoading: boolean;
};

const initialState: TOrderState = {
  orderData: null,
  isLoading: false
};

export const createOrder = createAsyncThunk(
  'order/createOrder',
  async (ingredients: string[]) => {
    const res = await orderBurgerApi(ingredients);
    return {
      ...res.order,
      ingredients: []
    } as TOrder;
  }
);

export const fetchOrderByNumber = createAsyncThunk(
  'order/fetchOrderByNumber',
  async (number: number) => {
    const res = await getOrderByNumberApi(number);

    if (!res.orders || !res.orders.length) {
      throw new Error('Order not found');
    }

    return res.orders[0];
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrder(state) {
      state.orderData = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderData = action.payload;
      })
      .addCase(createOrder.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchOrderByNumber.fulfilled, (state, action) => {
        state.orderData = action.payload;
      })
      .addCase(fetchOrderByNumber.rejected, (state) => {
        state.orderData = null;
      });
  }
});

export const { clearOrder } = orderSlice.actions;
export default orderSlice.reducer;
