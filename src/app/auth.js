import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authUser: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthUser: (state, action) => {
        state.authUser = action.payload;
    }
    // any additional reducers for this slice can be defined here
  },
});

export default authSlice.reducer;
export const {setAuthUser} = authSlice.actions;
