import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null, //dibuat null
};

const register = createSlice({
  initialState,
  name: "register",
  reducers: {
    registerInput: (state, action) => {
      state.register = action.payload; //jika login
    },
    registerDelete: (state) => {
      state.register = null; //jika logout
    },
  },
});

export const { registerInput, registerDelete } = register.actions;
export default register.reducer;