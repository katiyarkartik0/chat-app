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
    setSearchToDefault:(state,action)=>{
      state.searchedChatsAndUsers = null;
    }
  },
});

export const { setSearchedChatsAndUsers,setSearchToDefault } = searchSlice.actions;
export default searchSlice.reducer;