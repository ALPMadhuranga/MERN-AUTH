import { configureStore } from '@reduxjs/toolkit'   // This function helps us set up a Redux store, which is like a global state for our app.
import authReducer from './slices/authSlice'  // This is the file where we defined our initial state and reducers.

const store = configureStore({  // This function call initializes a Redux store with the provided configuration options.
  reducer: {    // We're saying our initial state (the data in our store) is empty {}.
    auth: authReducer,  // We're adding a new key called "auth" and assigning it the value of the authReducer.
  },  
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(), // We're using default settings for handling data changes (middleware).
  devTools: true,  // We're turning on a tool called Redux DevTools, which helps us track and debug our data changes.
});

export default store;