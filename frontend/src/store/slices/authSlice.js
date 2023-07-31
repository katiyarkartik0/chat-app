import { createSlice } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

const initialState = {
  userData: null,
  accessToken: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.userData = action.payload.userData;
      state.accessToken = action.payload.accessToken;
    },
    setLogout: (state, action) => {
      state.userData = null;
      state.accessToken = null;
    },
  },
  extraReducers(builder) {
    builder.addCase(PURGE, () => {
      return initialState;
    });
  },
});

export const { setLogin, setLogout } = authSlice.actions;
export default authSlice.reducer;
