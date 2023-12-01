import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: { token: null,isVerified:false,authData:{} ,appConfigData:{},isCurator:false,welcomeScreen:true},
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
        },
        setAppConfig: (state, action) => {
            state.appConfigData = action.payload
        },
        setCurator: (state, action) => {
            state.isCurator = action.payload
        },
        setWelcomeScreen: (state, action) => {
            state.welcomeScreen = action.payload
        },
    },
  });

export const { setToken,setAuthData,clearToken,verifiedUser,setAppConfig,setCurator,setWelcomeScreen } = authSlice.actions;

export default authSlice.reducer;