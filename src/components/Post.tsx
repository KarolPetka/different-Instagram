import "../styles/card.css";
import "../styles/post.css";
import Profile from "./Profile";
import { ReactComponent as CardButton } from "../images/cardButton.svg";
import Comment from "./Comment";
import React from "react";
import { addComment } from "../reducers/commentSlice";
import { useAppDispatch } from "../hooks";
import { useSelector } from "react-redux";
import { RootState } from "../store";

interface CommentsProps {
  user?: string;
  text?: string;
  id?: number;
}

interface CardProps {
  id: string;
  accountName?: string;
  storyBorder?: boolean;
  title: string;
  body: string;
  comments?: CommentsProps[];
  likedByText?: string;
  likedByNumber?: number;
  hours?: number;
  likedByAvatar?: string;
}

function Post(props: CardProps) {
    const dispatch = useAppDispatch();
    const inputRef = React.useRef(null);
    const account = useSelector((state: RootState) => state.account);

const postComment = () => {
    dispatch(
      addComment({
        user: account.username,
        id: 1,
        text: inputRef.current.value,
        postId: props.id,
      })
    );
    inputRef.current.value = "";
  };
  return (
    <div className="card">
      <header>
        <Profile
          iconSize="medium"
          username={props.accountName}
          storyBorder={props.storyBorder}
        />
        <CardButton className="cardButton" />
      </header>
      <div className="title">{props.title}</div>
      <div className="body">{props.body}</div>
      {/* <div className="likedBy">
        <Profile iconSize="small" hideAccountName={true} />
        <span>
          Liked by <strong>{props.likedByText}</strong> and{" "}
          <strong>{props.likedByNumber} others</strong>
        </span>
      </div> */}
      <div className="comments">
        {props.comments.map((comment: CommentsProps) => {
          return (
            <Comment
              key={comment.id}
              id={comment.id}
              postId={props.id}
              accountName={comment.user}
              comment={comment.text}
            />
          );
        })}
      </div>
      <div className="timePosted">{props.hours} HOURS AGO</div>
      <div className="addComment">
        <div style={{ display: "flex" }}>
          <input
            className="commentText"
            type="text"
            placeholder="Add a comment..."
            ref={inputRef}
          />
          <span className="postText" onClick={() => postComment()}>
            Post
          </span>
        </div>
      </div>
    </div>

  );
}

export default Post;
