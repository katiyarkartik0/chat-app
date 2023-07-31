import { createSlice } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

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
  extraReducers(builder) {
    builder.addCase(PURGE, () => {
      return initialState;
    });
  },
});

export const { setSearchedChatsAndUsers,setSearchToDefault } = searchSlice.actions;
export default searchSlice.reducer;