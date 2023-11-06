import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: { token: null,isVerified:false,authData:{} },
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
        },
        setAuthData: (state, action) => {
            state.authData = action.payload;
          },
        clearToken: (state) => {
            state.token = null;
            state.authData = {};
            state.isVerified = false
        },
        verifiedUser: (state, action) => {
            state.isVerified = action.payload
        }
    },
  });

export const { setToken,setAuthData,clearToken,verifiedUser } = authSlice.actions;

export default authSlice.reducer;