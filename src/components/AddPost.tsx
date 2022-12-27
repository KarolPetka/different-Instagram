import React, { useState } from "react";
import Modal from "react-modal";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../hooks";
import { addPost } from "../reducers/postSlice";
import { RootState } from "../store";

import "../styles/AddPost.css";

interface AddPostProps {
  modalIsOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

function AddPost({ modalIsOpen, openModal, closeModal }: AddPostProps) {
  const account = useSelector((state: RootState) => state.account);

  const [text, setText] = useState<string>("");
  const [image, setImage] = useState<string>("");

  const dispatch = useAppDispatch();
  const handleAddPost = () => {
    if (text.length > 0 && image)
      dispatch(
        addPost({
          albumId: 0,
          id: 0,
          title: text,
          url: image,
          author: {
            username: account.username,
            avatar: account.avatar,
            name: account.name,
          },
        })
      );
    closeModal();
  };

  const onImageChange = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result.toString());
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  return (
    <Modal
      id="modal"
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <div className="add-post">
        <header className="add-post-header">Add new post</header>
        <div className="add-post-image">
          Image:
          {/* <input
            className="add-post-input"
            onChange={(e) => setImage(e.target.value)}
          ></input> */}
          <input
            className="add-post-input"
            type="file"
            onChange={(e) => onImageChange(e)}
          />
        </div>
        <div className="add-post-text">
          Text:
          <input
            className="add-post-input"
            onChange={(e) => setText(e.target.value)}
          ></input>
        </div>
        <span className="add-post-apply" onClick={() => handleAddPost()}>
          Add
        </span>
      </div>
    </Modal>
  );
}

export default AddPost;
