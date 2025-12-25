import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    authUser: null,
    otherUsers: [],
    selectedUser: null,
    onlineUsers: null,
    typingUser: null,
    loading: false,
  },
  reducers: {
    setAuthUser: (state, action) => {
      state.authUser = action.payload;
    },
    setOtherUsers: (state, action) => {
      state.otherUsers = action.payload;
    },
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
      state.typingUser = null;
    },
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },
    setTypingUser: (state, action) => {
      state.typingUser = action.payload;
    },
    clearTypingUser: (state) => {
      state.typingUser = null;
    },
    setLoading: (state, action)=>{
        state.loading = action.payload;
    }
  },
});

export const {
  setAuthUser,
  setOtherUsers,
  setSelectedUser,
  setOnlineUsers,
  setTypingUser,
  clearTypingUser,
  setLoading,
} = userSlice.actions;

export default userSlice.reducer;
