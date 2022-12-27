import "../styles/comment.css";
import React from "react";
import { useAppDispatch } from "../hooks";
import { deleteComment } from "../reducers/commentSlice";

interface CommentProps {
  accountName: string;
  comment: string;
  id?: number;
  postId?: string;
}

function Comment(props: CommentProps) {
  const dispatch = useAppDispatch();

  const handleDeleteComment = () => {
    dispatch(
      deleteComment({
        user: props.accountName,
        text: props.comment,
        id: props.id,
        postId: props.postId,
      })
    );
  };
  return (
    <div className="commentContainer">
      <div className="accountName">{props.accountName}</div>
      <div className="comment">{props.comment}</div>
      <div className="deleteButton" onClick={() => handleDeleteComment()}><br></br>*DELETE*</div>
    </div>
  );
}

export default Comment;
