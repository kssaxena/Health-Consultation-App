import { configureStore } from "@reduxjs/toolkit";
import searchSlice from "./searchSlice";
import userSlice from "./userSlice";

const store = configureStore({
  reducer: {
    search: searchSlice,
    user: userSlice,
  },
});

export default store;
