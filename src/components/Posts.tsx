import "../styles/cards.css";
import React, { useEffect, useState } from "react";
import Post from "./Post";
import { useSelector } from "react-redux";
import { RootState } from "../store";

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

interface PostResult {
  userId: number
  id: number
  title: string
  body: string
}

function usernameByUserId(userId: number, users: Array<User>) {
  return users.find((user) => user.id === userId).username;
}

function getPosts() {
  return fetch("https://jsonplaceholder.typicode.com/posts").then<Array<PostResult>>((response) =>
    response.json()
  );
}

function getUsers() {
  return fetch("https://jsonplaceholder.typicode.com/users").then<Array<User>>((response) =>
    response.json()
  );
}

function Posts() {
  const comments = useSelector((state: RootState) => state.comments);
  const [posts, setPosts] = useState<Array<PostResult>>([]);
  const [users, setUsers] = useState<Array<User>>([]);

  useEffect(() => {
    const fetchUsersAndPosts = async () => {
      var [usersResponse, postsResponse] = await Promise.all([getUsers(), getPosts()])
      setUsers(usersResponse);
      setPosts(postsResponse);
    };
    fetchUsersAndPosts();
  }, []);

  return (
    <>
      {posts.map((post) => (
        <div className="cards" key={post.id}>
          <Post
            id={post.id.toString()}
            accountName={usernameByUserId(post.userId, users)}
            storyBorder={true}
            title={post.title}
            body={post.body}
            comments={comments[post.id] || []}
            // likedByText={
            //     post.likeBy.length === 0 ? "" : post.likeBy[0].username
            // }
            // likedByAvatar={
            //     post.likeBy.length === 0 ? "" : post.likeBy[0].avatar
            // }
            // likedByNumber={post.likes}
          />
        </div>
      ))}
    </>
  );
}

export default Posts;
