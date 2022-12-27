import "../styles/card.css";
import "../styles/post.css";
import Profile from "./Profile";
import "../styles/album.css";
import React, { useEffect, useState } from "react";
import FsLightbox from 'fslightbox-react';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}
interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}
interface Geo {
  lat: string;
  lng: string;
}
interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

function usernameByUserId(userId: number, users: Array<User>) {
  return users.find(user => user.id === userId).username
}

function getAlbums() {
  return fetch('https://jsonplaceholder.typicode.com/albums')
    .then(response => response.json())
}

function getUsers() {
  return fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
}

function getPosts() {
  return fetch("https://jsonplaceholder.typicode.com/photos").then((response) =>
    response.json()
  );
}

function Albums() {
  const [photos, setPhotos] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [users, setUsers] = useState([]);
  const [filteredPhotos, setFilteredPhotos] = useState([]);
  const [toggler, setToggler] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const [photosResponse, albumsResponse, usersResponse] =
        await Promise.all([getPosts(), getAlbums(), getUsers()])
      setPhotos(photosResponse);
      setAlbums(albumsResponse);
      setUsers(usersResponse);
    };
    fetchData();
  }, []);

  const handleClick = (id: number) => {
    setFilteredPhotos(photos.filter(photo => photo.albumId === id).map(filteredPhoto => filteredPhoto.url));

    setToggler(!toggler)
  };

  return (
    <>
      <div className="album-card">
        {albums.map((props) => (
          <div key={props.id}>
            <header>
              <div onClick={() => handleClick(props.id)}>
                <Profile
                  iconSize="medium"
                  username={usernameByUserId(props.userId, users)}
                  storyBorder={true}
                />
              </div>
            </header>
          </div>
        ))}
      </div>

      <div>
        <FsLightbox
          toggler={toggler}
          sources={filteredPhotos}
          type="image"
        />
      </div>
    </>
  );
}

export default Albums;
