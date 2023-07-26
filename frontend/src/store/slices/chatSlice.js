import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedChat: null,
  allChats:[]
};

const chatsSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setSelectedChat: (state, action) => {
      state.selectedChat = action.payload;
    },
    setAllChats:(state,action)=>{
      state.allChats = action.payload
    }
  },
});

export const { setSelectedChat,setAllChats } = chatsSlice.actions;
export default chatsSlice.reducer;