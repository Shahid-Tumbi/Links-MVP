import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: { token: null,isVerified:false,authData:{} ,appConfigData:{},isCurator:false,welcomeScreen:true,sharedLink:null,sheetOpen:false},
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
        },
        setAuthData: (state, action) => {
            state.authData = action.payload;
          },
        clearToken: (state) => {
            return {
                token: null,
                authData: {},
                appConfigData: {},
                isCurator: false,
                welcomeScreen: false,
                sharedLink: null,
                sheetOpen: false,
                isVerified: false,
            };
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
        setSharedLink: (state, action) => {
            state.sharedLink = action.payload
        },
        setSheetOpen: (state, action) => {
            state.sheetOpen = action.payload
        },
    },
  });

export const { setToken,setAuthData,clearToken,verifiedUser,setAppConfig,setCurator,setWelcomeScreen,setSharedLink,setSheetOpen } = authSlice.actions;

export default authSlice.reducer;