import { createSlice } from "@reduxjs/toolkit";
import { userAgent } from "next/server";
import { decodeToken } from "react-jwt";

export const auth = createSlice({
  name: "auth",
  initialState: {
    access_token: "",
  },
  reducers: {
    setToken: (state, action) => {
      state.access_token = action.payload;
    },
  },
});

export const { setToken } = auth.actions;
export const getToken = (state) => ({
  access_token: state.auth.access_token,
});
export const getUser = (state) => decodeToken(state.auth.access_token);
export default auth.reducer;
