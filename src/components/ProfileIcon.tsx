import "../styles/profileIcon.css";
import React from "react";

interface ProfileIconProps {
  iconSize?: string;
  storyBorder?: boolean;
  image?: File | string;
}

function ProfileIcon(props: ProfileIconProps) {
  function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  let randomId: number = getRandomInt(1, 70);

  let profileImage: string | File = props.image
    ? props.image
    : `https://i.pravatar.cc/150?img=${randomId}`;

  return (
    <div className={props.storyBorder ? "storyBorder" : ""}>
      <img
        className={`profileIcon ${props.iconSize}`}
        src={profileImage.toString()}
        alt="profile"
      />
    </div>
  );
}

export default ProfileIcon;
