import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  accessToken: null,
  userId: "",
  nickname: "",
  avatar: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userLogin: (state, action) => {
      const response = action.payload;
      state.isLoggedIn = true;
      state.accessToken = response.accessToken;
      state.userId = response.userId;
      state.nickname = response.nickname;
      state.avatar = response.avatar;
      //   console.log(`id: ${state.userId}`);
      //   console.log(`accessToken> ${state.accessToken}`);
      //   console.log(`nickname: ${state.nickname}`);
      //   console.log(`avatar: ${state.avatar}`);
    },
    userLogout: (state) => {
      state.isLoggedIn = false;
      state.accessToken = null;
      state.userId = "";
      state.nickname = "";
      state.avatar = "";
      localStorage.removeItem("response");
    },
  },
});

export default authSlice.reducer;
export const { userLogin, userLogout } = authSlice.actions;
