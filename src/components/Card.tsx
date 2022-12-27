import "../styles/card.css";
import Profile from "./Profile";
import { ReactComponent as CardButton } from "../images/cardButton.svg";
import CardMenu from "./CardMenu";
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
  author?: Record<string, string>;
  storyBorder?: boolean;
  image?: string;
  comments?: CommentsProps[];
  likedByText?: string;
  likedByNumber?: number;
  hours?: number;
  likedByAvatar?: string;
}

function Card(props: CardProps) {
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
          username={props.author.username}
          storyBorder={props.storyBorder}
          image={props.author.avatar}
        />
        <CardButton className="cardButton" />
      </header>
      <img className="cardImage" src={props.image} alt="card content" />
      <CardMenu postId={props.id} account={props.author.username} />
      {props.likedByNumber > 0 && (
        <div className="likedBy">
          <Profile
            iconSize="small"
            hideAccountName={true}
            image={props.likedByAvatar}
          />
          <span>
            Liked by <strong>{props.likedByText}</strong>
            {props.likedByNumber > 1 &&
              "and" + <strong>{props.likedByNumber - 1} others</strong>}
          </span>
        </div>
      )}
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

export default Card;
