import { createSlice, PayloadAction, current } from "@reduxjs/toolkit";

export interface Post {
  albumId: number;
  id: number;
  title: string;
  url: string;
  likes?: number;
  likeBy?: Author[];
  author: {
    username: string;
    avatar: string;
    name: string;
  };
}

interface Author {
  username: string;
  avatar: string;
  name: string;
}

interface LikePost {
  postId: number;
  username: string;
  avatar: string;
  name: string;
}

const initialState: Post[] = [];

export const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPost: (state, action: PayloadAction<Post>) => {
      state.unshift({
        albumId: state.length + 1,
        id: state.length + 1,
        title: action.payload.title,
        url: action.payload.url,
        likes: 0,
        likeBy: [],
        author: {
          username: action.payload.author.username,
          avatar: action.payload.author.avatar,
          name: action.payload.author.name,
        },
      });
    },
    likePost: (state, action: PayloadAction<LikePost>) => {
      const index = state.findIndex(
        (post) => post.id === action.payload.postId
      );

      if (
        state[index].likeBy.filter(
          (e) => e.username === action.payload.username
        ).length === 0
      ) {
        const newLikesBy = [
          ...state[index].likeBy,
          {
            username: action.payload.username,
            avatar: action.payload.avatar,
            name: action.payload.name,
          },
        ];

        state[index].likes = newLikesBy.length;
        state[index].likeBy = newLikesBy;
        console.log(current(state));

        return state;
      } else {
        const newLikesBy = state[index].likeBy.filter(
          (item) => item.username !== action.payload.username
        );

        state[index].likes = newLikesBy.length;
        state[index].likeBy = newLikesBy;
        return state;
      }
    },
  },
});

export const { addPost, likePost } = postSlice.actions;

export default postSlice.reducer;
