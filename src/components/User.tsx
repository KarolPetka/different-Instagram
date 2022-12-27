import "../styles/user.css";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { Account } from "../interfaces";

import { set, get } from "lodash";
import { updateAccount } from "../reducers/accountSilce";
import { useAppDispatch } from "../hooks";
import immer from "immer";

function User() {
  const account = useSelector((state: RootState) => state.account);

  const [enableEdit, setEnableEdit] = useState<boolean>(false);
  const [accountData, setAccountData] = useState<Account>(account);

  const dispatch = useAppDispatch();

  const handleAccountDataChange = (input: string, data: string) => {
    const newState = immer(accountData, (draft) => {
      set(draft, input.split("."), data);
    });

    setAccountData(newState);
  };

  const save = () => {
    dispatch(updateAccount(accountData));
    setEnableEdit(false);
  };

  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (e) => {
        const newState = {
          ...accountData,
          avatar: e.target.result.toString(),
        };

        setAccountData(newState);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const getInput = (name: string) => {
    return (
      <input
        value={get(accountData, name)}
        onChange={(e) => handleAccountDataChange(name, e.target.value)}
      />
    );
  };

  return (
    <div className="user-contianer">
      <div className="user">
        <div>
          <img
            src={accountData.avatar as string}
            className="picture"
            alt="user"
          />
          {enableEdit && (
            <div>
              Avatar url:
              <input
                className="add-post-input"
                type="file"
                onChange={(e) => onImageChange(e)}
              />
            </div>
          )}
        </div>

        <div className="namespace">
          <div className="username">
            <span className="line">Username: </span>
            {enableEdit ? getInput("username") : account.username}
          </div>
          <div className="name">
            <span className="line">Name: </span>
            {enableEdit ? getInput("name") : account.name}
          </div>
          <div className="info">
            <span className="line">Email: </span>
            {enableEdit ? getInput("email") : account.email}
          </div>
          <div className="info">
            <span className="line">phone: </span>
            {enableEdit ? getInput("phone") : account.phone}
          </div>
          <div className="info">
            <span className="line">website: </span>
            {enableEdit ? getInput("website") : account.website}
          </div>
        </div>
        <div className="data">
          <div className="info">
            <span className="line">street: </span>
            {enableEdit ? getInput("address.street") : account.address.street}
          </div>
          <div className="info">
            <span className="line">suite: </span>
            {enableEdit ? getInput("address.suite") : account.address.suite}
          </div>
          <div className="info">
            <span className="line">city: </span>
            {enableEdit ? getInput("address.city") : account.address.city}
          </div>
          <div className="info">
            <span className="line">zipcode: </span>
            {enableEdit ? getInput("address.zipcode") : account.address.zipcode}
          </div>
          <div className="info">
            <span className="line">location: </span>
            {enableEdit
              ? getInput("address.geo.lat")
              : account.address.geo.lat}{" "}
            X{" "}
            {enableEdit ? getInput("address.geo.lng") : account.address.geo.lng}
          </div>
          <div className="info">
            <span className="line">street: </span>
            {enableEdit ? getInput("address.street") : account.address.street}
          </div>
          <div className="info">
            <span className="line">company: </span>
            {enableEdit ? getInput("company.name") : account.company.name}
          </div>
          <div className="info">
            <span className="line">catchPhrase: </span>
            {enableEdit
              ? getInput("company.catchPhrase")
              : account.company.catchPhrase}
          </div>
          <div className="info">
            <span className="line">bs: </span>
            {enableEdit ? getInput("company.bs") : account.company.bs}
          </div>
        </div>
        <div className="edit" onClick={() => setEnableEdit(!enableEdit)}>
          Edit
        </div>
      </div>
      <button className="save" onClick={() => save()}>
        Save
      </button>
    </div>
  );
}

export default User;
