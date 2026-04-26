import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUserApi } from '../../utils/burger-api';
import { loginUserApi } from '../../utils/burger-api';
import { registerUserApi } from '../../utils/burger-api';
import { TUser } from '../../utils/types';
import { logoutApi } from '../../utils/burger-api';
import { updateUserApi } from '../../utils/burger-api';
import { setCookie } from '../../utils/cookie';

type TUserState = {
  user: TUser | null;
  isAuth: boolean;
  isLoading: boolean;
  isAuthChecked: boolean;
};

const initialState: TUserState = {
  user: null,
  isAuth: false,
  isLoading: false,
  isAuthChecked: false
};

export const getUser = createAsyncThunk('user/getUser', async () => {
  const res = await getUserApi();
  return res.user;
});

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (data: { email: string; password: string }) => {
    const res = await loginUserApi(data);

    localStorage.setItem('refreshToken', res.refreshToken);
    setCookie('accessToken', res.accessToken);

    return res.user;
  }
);

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (data: { email: string; password: string; name: string }) => {
    const res = await registerUserApi(data);

    localStorage.setItem('refreshToken', res.refreshToken);
    setCookie('accessToken', res.accessToken);

    return res.user;
  }
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (data: { email: string; password?: string; name: string }) => {
    const res = await updateUserApi(data);
    return res.user;
  }
);

export const logoutUser = createAsyncThunk('user/logoutUser', async () => {
  await logoutApi();

  localStorage.removeItem('refreshToken');
  localStorage.removeItem('accessToken');

  return null;
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuth = true;
        state.isAuthChecked = true;
      })
      .addCase(getUser.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuth = false;
        state.isAuthChecked = true;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuth = true;
      })
      .addCase(loginUser.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuth = true;
      })
      .addCase(registerUser.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuth = false;
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(updateUser.rejected, (state) => {
        state.isLoading = false;
      });
  }
});

export default userSlice.reducer;
