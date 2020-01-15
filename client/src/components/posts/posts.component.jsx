import React, { useEffect, useState } from "react";
import axios from "axios";
import "./posts.css";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const api = "http://localhost:4000/api/posts/";

  useEffect(() => {
    axios
      .get(api)
      .then(res => {
        console.log(res);

        setPosts(res.data.posts);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <div className="posts">
      {posts.map(post => (
        <div className="card" key={post.id}>
          <h2>{post.title}</h2>
          <h3>{post.contents}</h3>
        </div>
      ))}
    </div>
  );
};

export default Posts;
