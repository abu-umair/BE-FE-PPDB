import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null, //dibuat null
};

const user = createSlice({
  initialState,
  name: "user",
  reducers: {
    userLogin: (state, action) => {
      state.user = action.payload; //jika login
    },
    userLogout: (state) => {
      state.user = null; //jika logout
    },
  },
});

export const { userLogin, userLogout } = user.actions;
export default user.reducer;
