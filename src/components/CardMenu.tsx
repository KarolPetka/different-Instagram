import "../styles/cardMenu.css";
import { ReactComponent as Inbox } from "../images/inbox.svg";
import { ReactComponent as Comments } from "../images/comments.svg";
import { ReactComponent as Notifications } from "../images/notifications.svg";
import { ReactComponent as Bookmark } from "../images/bookmark.svg";
import React from "react";
import { useAppDispatch } from "../hooks";
import { likePost } from "../reducers/postSlice";
import { useSelector } from "react-redux";
import { RootState } from "../store";

interface CardMenuProps {
  postId: string;
  account: string;
}

function CardMenu({ postId, account }: CardMenuProps) {
  const dispatch = useAppDispatch();
  const _account = useSelector((state: RootState) => state.account);
  const like = () => {
    dispatch(
      likePost({
        postId: parseInt(postId),
        username: _account.username,
        avatar: _account.avatar,
        name: _account.name,
      })
    );
  };
  return (
    <div className="cardMenu">
      <div className="interactions">
        <Notifications className="icon" onClick={() => like()} />
        <Comments className="icon" />
        <Inbox className="icon" />
      </div>
      <Bookmark className="icon" />
    </div>
  );
}

export default CardMenu;
