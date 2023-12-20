
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface User {
 id: string;
 followerCount: number;
}

export interface UserState {
 users: User[];
}

const userSlice = createSlice({
 name: 'user',
 initialState: { users: [] } as UserState,
 reducers: {
   updateFollowerCount: (state, action: PayloadAction<{ userId: string; newCount: number }>) => {
     const user = state.users.find(user => user.id === action.payload.userId);
     if (user) {
       user.followerCount = action.payload.newCount;
     }
   },
 },
});

export const { updateFollowerCount } = userSlice.actions;

export default userSlice.reducer;
