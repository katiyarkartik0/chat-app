import { createSlice } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

const initialState = {
  selectedChat: null,
  allChats: [],
  notificationState: {},
  latestMessageDirectory:{}
};

const chatsSlice = createSlice({
  name: "chats",
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
    setChatsToDefault: (state, action) => {
      state.selectedChat = null;
      state.allChats = [];
    },
    setNotificationState: (state, action) => {
      const { notificationState } = state;
      const notificationObj = action.payload;
      state.notificationState = { ...notificationState, ...notificationObj };
    },
    setLatestMessageDirectory:(state,action)=>{
      const {latestMessageDirectory} = state;
      const latestMessageObject = action.payload;
      state.latestMessageDirectory = {...latestMessageDirectory,...latestMessageObject}
    }
  },
  extraReducers(builder) {
    builder.addCase(PURGE, () => {
      return initialState;
    });
  },
});

export const {
  setSelectedChat,
  setAllChats,
  addToAllChats,
  setChatsToDefault,
  setNotificationState,
  setLatestMessageDirectory
} = chatsSlice.actions;
export default chatsSlice.reducer;
