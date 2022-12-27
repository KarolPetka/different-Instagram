import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userSlice";
import commentReducer from "./reducers/commentSlice";
import postReducer from "./reducers/postSlice";
import accountReducer from "./reducers/accountSilce";

const store = configureStore({
  reducer: {
    user: userReducer,
    comments: commentReducer,
    posts: postReducer,
    account: accountReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
