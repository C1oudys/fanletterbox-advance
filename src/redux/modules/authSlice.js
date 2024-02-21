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
      //   console.log(`id: ${state.userId}`);
      //   console.log("accessToken>", accessToken);
      //   console.log(`nickname: ${state.nickname}`);
      //   console.log(`avatar: ${state.avatar}`);
      localStorage.setItem("nickname", JSON.stringify(nickname));
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("userId", JSON.stringify(userId));
      localStorage.setItem("avatar", JSON.stringify(avatar));
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
