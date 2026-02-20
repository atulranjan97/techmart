// External Module
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null,
} 

// this is simply to set the users credentials to local storage and remove them
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            // when we hit our backend through the userApiSlice, we get our userInfo which we gonna send it in the action as the payload
            state.userInfo = action.payload;
            
            const expirationTime = new Date().getTime() + 24 * 60 * 60 * 1000;  // 1 day
            // const expirationTime = new Date().getTime() + 60 * 1000;  // 1 minute (for testing)

            localStorage.setItem('userInfo', JSON.stringify(action.payload));
            localStorage.setItem('expirationTime', expirationTime);
        },  
        logout: (state) => {
            state.userInfo = null; 
            localStorage.clear();   // clear entire local storage after logging out
        },
    }
})

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;

// On logout, state.userInfo = null is necessary to immediately update the Redux state so the UI, protected routes, and selectors know the user is logged out right away. Clearing localStorage only removes persisted data for future reloads and does not affect the current in-memory state, so without setting userInfo to null, the app would still behave as if the user is logged in until a refresh.