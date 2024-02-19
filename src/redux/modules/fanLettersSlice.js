import { createSlice } from "@reduxjs/toolkit";

const fanLettersSlice = createSlice({
  name: "fanLetters",
  initialState: {
    fanLetters: [],
  },
  reducers: {
    addFanLetter: (state, action) => {
      state.fanLetters.push(action.payload);
    },
    editFanLetter: (state, action) => {
      const { id, content } = action.payload;
      const letterToEdit = state.fanLetters.find((letter) => letter.id === id);
      if (letterToEdit) {
        letterToEdit.content = content;
      }
    },
    deleteFanLetter: (state, action) => {
      const letterIndex = state.fanLetters.findIndex(
        (letter) => letter.id === action.payload
      );
      if (letterIndex !== -1) {
        state.fanLetters.splice(letterIndex, 1);
      }
    },
  },
});

export const { addFanLetter, editFanLetter, deleteFanLetter } =
  fanLettersSlice.actions;

export default fanLettersSlice.reducer;
