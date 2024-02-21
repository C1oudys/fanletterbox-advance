// src/redux/fanLettersSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = "http://localhost:5000/fanLetters";

export const fetchFanLettersAsync = createAsyncThunk(
  "fanLetters/fetchFanLetters",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(baseURL);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// 팬레터 추가
export const addFanLetterAsync = createAsyncThunk(
  "fanLetters/addFanLetter",
  async (fanLetterData, { rejectWithValue }) => {
    try {
      console.log(fanLetterData);
      const response = await axios.post(baseURL, fanLetterData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// 팬레터 수정
export const editFanLetterAsync = createAsyncThunk(
  "fanLetters/editFanLetter",
  async ({ id, updatedData }, { getState, rejectWithValue }) => {
    try {
      const { accessToken } = getState().auth;
      const response = await axios.patch(`${baseURL}/${id}`, updatedData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data; // Return the updated data from the server
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// 팬레터 삭제
export const deleteFanLetterAsync = createAsyncThunk(
  "fanLetters/deleteFanLetter",
  async (id, { getState, rejectWithValue }) => {
    try {
      const { accessToken } = getState().auth;
      await axios.delete(`${baseURL}/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return id; // Return the deleted letter ID
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// 팬레터 슬라이스 정의
const fanLettersSlice = createSlice({
  name: "fanLetters",
  initialState: {
    fanLetters: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFanLettersAsync.fulfilled, (state, action) => {
        state.fanLetters = action.payload;
        state.status = "succeeded";
      })
      .addCase(addFanLetterAsync.fulfilled, (state, action) => {
        state.fanLetters.push(action.payload);
      })
      .addCase(editFanLetterAsync.fulfilled, (state, action) => {
        const index = state.fanLetters.findIndex(
          (letter) => letter.id === action.payload.id
        );
        if (index !== -1) {
          state.fanLetters[index] = action.payload;
        }
      })
      .addCase(deleteFanLetterAsync.fulfilled, (state, action) => {
        state.fanLetters = state.fanLetters.filter(
          (letter) => letter.id !== action.payload
        );
      });
  },
});

export default fanLettersSlice.reducer;
