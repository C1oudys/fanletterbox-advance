import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false, // 상태 이름 변경
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      // 로그인 작업 처리
      state.isAuthenticated = true; // 상태 이름 변경
    },
    register: (state, action) => {
      // 회원가입 작업 처리
      state.isAuthenticated = true; // 회원가입 후 자동으로 로그인
    },
    loginUser: (state, action) => {
      // 로그인 작업 처리
      state.isAuthenticated = true;
    },
  },
});

export const { login, register, loginUser } = authSlice.actions;

export default authSlice.reducer;
