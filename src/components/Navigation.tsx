import "../styles/navigation.css";
import Menu from "./Menu";
import logo from "../images/instagramLogo.png";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import album from "../images/albums.png";
import posts from "../images/posts.png";
import photo from "../images/photos.png";

interface LinkData {
  id: number,
  text: string,
  image: string,
  link: string
}

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

interface Photo {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

function Navigation() {
  const links: LinkData[] = [
    { id: 1, text: "Albums", image: album, link: "/albums" },
    { id: 2, text: "Posts", image: posts, link: "/posts" },
    { id: 3, text: "Photos", image: photo, link: "/" },
  ];

  const [activeId, setActiveId] = useState(1);
  const [input, setInput] = useState('');
  const [show, setShow] = useState(false);
  const [user, setUser] = useState<Array<User>>([]);
  const [photos, setPhotos] = useState<Array<Photo>>([]);
  const [albums, setAlbums] = useState<Array<Photo>>([]);
  const [showUser, setShowUser] = useState(false);
  const [showPhoto, setShowPhoto] = useState(false);
  const [showAlbum, setShowAlbum] = useState(false);

  const search = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setShow(true)
    const keyValue = input.split("-");
    if (keyValue[0].toLowerCase() === "userid" && +keyValue[1] <= 10) {
      setShowPhoto(false)
      setShowAlbum(false)
      getUserPromise(keyValue[1])
        .then((user) => {
          setShowUser(true)
          setUser(user);
        })
    } else if (keyValue[0].toLowerCase() === "photoid" && +keyValue[1] <= 5000) {
      setShowUser(false)
      setShowAlbum(false)
      getPhotoPromise(keyValue[1])
        .then((photo) => {
          setShowPhoto(true)
          console.log(photo)
          setPhotos(photo);
        })
    } else if (keyValue[0].toLowerCase() === "albumid" && +keyValue[1] <= 100) {
      setShowUser(false)
      setShowPhoto(false)
      getAlbumPromise(keyValue[1])
        .then((album) => {
          setShowAlbum(true)
          console.log(album.at(0))
          setAlbums(album.at(0));
        })
    }
  }

  function getUser(id: string) {
    return fetch('https://jsonplaceholder.typicode.com/users/' + id).then((response) => response.json());
  }

  function getUserPromise(id: string) {
    return Promise.all([getUser(id)])
  }

  function getPhoto(id: string) {
    return fetch('https://jsonplaceholder.typicode.com/photos/' + id).then((response) => response.json());
  }

  function getPhotoPromise(id: string) {
    return Promise.all([getPhoto(id)])
  }

  function getAlbum(id: string) {
    return fetch('https://jsonplaceholder.typicode.com/photos?albumId=' + id).then((response) => response.json());
  }

  function getAlbumPromise(id: string) {
    return Promise.all([getAlbum(id)])
  }

  const close = (event: React.MouseEvent<HTMLButtonElement>) => {
    setInput('')
    setUser([])
    setShowUser(false)
    setShowPhoto(false)
    setShowAlbum(false)
    setShow(false)
  }

  return (
    <>
      <div className="nav">
        <div className="navigation">
          <div className="container">
            <img className="logo" src={logo} alt="instagram logo" />
            <form onSubmit={search}>
              <input className="search" type="text" placeholder="Search" value={input} onChange={(e) => setInput(e.target.value)}></input>
              <input type="submit" hidden />
            </form>
            <Menu />
          </div>
        </div>
        <div className="switch">
          {links.map((val) => (
            <Link
              key={val.id}
              to={val.link}
              onClick={() => setActiveId(val.id)}
              className={activeId === val.id ? "active" : "inactive"}
            >
              <img src={val.image} alt={val.text} className="switch-image" />
              {val.text}
            </Link>
          ))}
        </div>
      </div>

      <div id="myNav" className="overlay" style={show ? { display: 'block' } : { display: 'none' }}>

        <button className="closebtn" onClick={close}>&times;</button>

        <div className="overlay-content">
          <div style={showUser ? { display: 'block' } : { display: 'none' }}>
            {user.map(user => (
              <div key={user.id}>
                <div className="user-data">ID: {user.id}</div>
                <div className="user-data">Username: {user.username}</div>
                <div className="user-data">Name: {user.name}</div>
                <div className="user-data">E-mail: {user.email}</div>
                <div className="user-data">Phone: {user.phone}</div>
                <div className="user-data">Website: {user.website}</div>
                <div className="user-data">Comapny Name: {user.company.name}</div>
                <div className="user-data">City: {user.address.city}</div>
              </div>
            ))}
          </div>
          <div style={showPhoto ? { display: 'block' } : { display: 'none' }}>
            {photos.map(photo => (
              <div key={photo.id}>
                <div className="user-data">ID: {photo.id}</div>
                <img src={photo.url} alt="decent post"></img>
                <div className="user-data">Title: {photo.title}</div>
              </div>
            ))}
          </div>
          <div style={showAlbum ? { display: 'block' } : { display: 'none' }}>
            {albums.map(album => (
              <div key={album.id}>
                <div>{albums.at(0).thumbnailUrl}</div>
                <div className="user-data">ID: {album.id}</div>
                <img src={album.url} alt="true artist piece"></img>
                <div className="user-data">Title: {album.title}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Navigation;
