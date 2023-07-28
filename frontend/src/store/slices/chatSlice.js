import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedChat: null,
  allChats: [],
};

const chatsSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setSelectedChat: (state, action) => {
      state.selectedChat = action.payload;
    },
    setAllChats: (state, action) => {
      state.allChats = action.payload;
    },
    addToAllChats: (state, action) => {
      state.allChats.push(action.payload);
    },
    setChatsToDefault:(state,action)=>{
      state.selectedChat = null;
      state.allChats=[]
    }
  },
});

export const { setSelectedChat, setAllChats, addToAllChats,setChatsToDefault } =
  chatsSlice.actions;
export default chatsSlice.reducer;
