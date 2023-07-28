export const getAccessToken = (state) => state.auth.accessToken;
export const getUserData = (state) => state.auth.userData;
export const getAllChats = (state) => state.chats.allChats;
export const getSelectedChat = (state) => state.chats.selectedChat;
export const getSearchedChatsAndUsers = (state) =>
  state.search.searchedChatsAndUsers;
