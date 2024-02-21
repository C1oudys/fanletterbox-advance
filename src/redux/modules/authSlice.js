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
      const { accessToken, userId, nickname, avatar } = action.payload;
      state.isLoggedIn = true;
      state.accessToken = accessToken;
      state.userId = userId;
      state.nickname = nickname;
      state.avatar = avatar;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("userId", JSON.stringify(userId));
      localStorage.setItem("nickname", JSON.stringify(nickname));
      localStorage.setItem("avatar", JSON.stringify(avatar));
    },

    userLogout: (state) => {
      state.isLoggedIn = false;
      state.accessToken = null;
      state.userId = "";
      state.nickname = "";
      state.avatar = "";
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userId");
      localStorage.removeItem("nickname");
      localStorage.removeItem("avatar");
    },

    initUser: (state) => {
      const accessToken = localStorage.getItem("accessToken");
      const userId = JSON.parse(localStorage.getItem("userId"));
      const nickname = JSON.parse(localStorage.getItem("nickname"));
      const avatar = JSON.parse(localStorage.getItem("avatar"));
      if (accessToken && userId && nickname && avatar) {
        state.isLoggedIn = true;
        state.accessToken = accessToken;
        state.userId = userId;
        state.nickname = nickname;
        state.avatar = avatar;
      }
    },
  },
});

export const { userLogin, userLogout, initUser } = authSlice.actions;
export default authSlice.reducer;
