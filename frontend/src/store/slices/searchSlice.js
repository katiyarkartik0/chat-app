import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchedChatsAndUsers:[]
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchedChatsAndUsers: (state, action) => {
      state.searchedChatsAndUsers = action.payload;
    },
  },
});

export const { setSearchedChatsAndUsers } = searchSlice.actions;
export default searchSlice.reducer;