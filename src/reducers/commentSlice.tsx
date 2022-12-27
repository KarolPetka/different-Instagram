import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Comment } from "../interfaces";

interface Posts {
  [key: string]: Comment[];
}

const initialState: Posts = {};

export const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    addComment: (state, action: PayloadAction<Comment>) => {
      if (!state[action.payload.postId]) {
        state[action.payload.postId] = [
          {
            ...action.payload,
            id: 1,
          },
        ];
      } else {
        state[action.payload.postId].push({
          ...action.payload,
          id: state[action.payload.postId].length + 1,
        });
      }
    },
    deleteComment: (state, action: PayloadAction<Comment>) => {
      const filteredComments = state[action.payload.postId].filter(
        (item) => item.id !== action.payload.id
      );
      state[action.payload.postId] = filteredComments;
      return state;
    },
  },
});

export const { addComment, deleteComment } = commentSlice.actions;

export default commentSlice.reducer;
