import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLogin: localStorage.getItem("accessToken") ? true : false,
  userId: localStorage.getItem("userId"),
  avatar: localStorage.getItem("avatar"),
  nickname: localStorage.getItem("nickname"),
  isLoading: false,
  isError: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(__logIn.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(__logIn.fulfilled, (state, action) => {
        const { accessToken, userId, avatar, nickname } = action.payload;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("userId", userId);
        localStorage.setItem("avatar", avatar);
        localStorage.setItem("nickname", nickname);
        state.isLogin = true;
        state.userId = userId;
        state.avatar = avatar;
        state.nickname = nickname;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(__logIn.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload;
      })

      .addCase(__logOut.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(__logOut.fulfilled, (state, action) => {
        localStorage.clear();
        console.log(action.payload);
        state.isLoading = false;
        state.isError = false;
        state.isLogin = false;
      })
      .addCase(__logOut.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload;
      });
  },
});

export const __signUp = createAsyncThunk(
  "users/signUp",
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post(
        "https://moneyfulpublicpolicy.co.kr/register",
        credentials
      );
      return response.data;
    } catch (error) {
      // rejectWithValue를 사용하여 사용자 정의 오류 메시지 또는 오류 객체를 전달
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const __logIn = createAsyncThunk(
  "users/logIn",
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post(
        "https://moneyfulpublicpolicy.co.kr/login",
        userData
      );
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const __logOut = createAsyncThunk(
  "users/logOut",
  async (userData, thunkAPI) => {
    try {
      console.log(userData);
    } catch (error) {
      alert("에러발생");
      console.log(error);
    }
  }
);
export default authSlice.reducer;
