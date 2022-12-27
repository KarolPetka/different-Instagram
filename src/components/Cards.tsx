import "../styles/cards.css";
import Card from "./Card";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useAppDispatch } from "../hooks";
import { addPost, Post } from "../reducers/postSlice";

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

function getPosts() {
  return fetch("https://jsonplaceholder.typicode.com/photos").then<Array<Post>>((response) =>
    response.json()
  );
}

function getUsers() {
  return fetch("https://jsonplaceholder.typicode.com/users").then<Array<User>>((response) =>
    response.json()
  );
}

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function Cards() {
  const comments = useSelector((state: RootState) => state.comments);
  const posts = useSelector((state: RootState) => state.posts);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getData = async () => {
      let photosResponse: Post[] = []
      if (posts.length === 0) {
        photosResponse = await getPosts();
      }
      const usersResponse = await getUsers();

      return {
        usersResponse,
        photosResponse,
      };
    };

    getData().then((data) => {
      data.photosResponse.slice(0, 10).map((item: any) => {
        const randomUser =
          data.usersResponse[
          Math.floor(Math.random() * data.usersResponse.length)
          ];

        const randomId: number = getRandomInt(1, 70);
        dispatch(
          addPost({
            albumId: item.albumId,
            id: item.id,
            title: item.title,
            url: item.url,
            author: {
              username: randomUser.username,
              avatar: `https://i.pravatar.cc/150?img=${randomId}`,
              name: randomUser.name,
            },
          })
        );
        return "warning handled"
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {posts.map((photo) => (
        <div className="cards" key={photo.id}>
          <Card
            id={photo.id.toString()}
            author={photo.author}
            storyBorder={true}
            image={photo.url}
            comments={comments[photo.id] || []}
            likedByText={
              photo.likeBy.length === 0 ? "" : photo.likeBy[0].username
            }
            likedByAvatar={
              photo.likeBy.length === 0 ? "" : photo.likeBy[0].avatar
            }
            likedByNumber={photo.likes}
            hours={16}
          />
        </div>
      ))}
    </>
  );
}

export default Cards;
