import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "UserDetails",
  initialState: {
    userDetails: [],
  },
  reducers: {
    addUser: (state, action) => {
      state.userDetails.push(action.payload);
    },
    removeUser: (state) => {
      state.userDetails.pop();
    },
  },
});

export const { addUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
