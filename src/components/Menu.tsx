import "../styles/menu.css";
import { ReactComponent as Home } from "../images/home.svg";
import { ReactComponent as Add } from "../images/add.svg";

import ProfileIcon from "./ProfileIcon";
import React from "react";
import { Link } from "react-router-dom";
import AddPost from "./AddPost";
import { useSelector } from "react-redux";
import { RootState } from "../store";

function Menu() {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const account = useSelector((state: RootState) => state.account);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  return (
    <div className="menu">
      <Link to="/">
        <Home className="icon" />
      </Link>
      <Add className="icon" onClick={() => openModal()}></Add>
      <Link to="/profile">
        <ProfileIcon iconSize="small" image={account.avatar} />
      </Link>
      <AddPost
        modalIsOpen={modalIsOpen}
        openModal={openModal}
        closeModal={closeModal}
      />
    </div>
  );
}

export default Menu;
