import "../styles/profile.css";
import ProfileIcon from "./ProfileIcon";
import users from "../data/users";
import React from "react";

interface ProfileProps {
  username?: string;
  caption?: string;
  urlText?: string;
  iconSize?: string;
  captionSize?: string;
  storyBorder?: boolean;
  hideAccountName?: boolean;
  image?: File | string;
}

function Profile(props: ProfileProps) {
  let accountName: string = props.username
    ? props.username
    : users[Math.floor(Math.random() * users.length)].username;

  return (
    <div className="profile">
      <ProfileIcon
        iconSize={props.iconSize}
        storyBorder={props.storyBorder}
        image={props.image}
      />
      {(accountName || props.caption) && !props.hideAccountName && (
        <div className="textContainer">
          <span className="accountName">{accountName}</span>
          <span className={`caption ${props.captionSize}`}>
            {props.caption}
          </span>
        </div>
      )}
      <a href="/">{props.urlText}</a>
    </div>
  );
}

export default Profile;
