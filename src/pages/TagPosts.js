// src/pages/TagPosts.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
// import "./TagPosts.css";

const TagPosts = () => {
  const { tag } = useParams();
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        let response;
        if (tag === "untagged") {
          response = await axios.get(
            "https://yasamannetserver-0b9ae46e8ccd.herokuapp.com/posts?untagged=true"
          );
        } else {
          response = await axios.get(
            `https://yasamannetserver-0b9ae46e8ccd.herokuapp.com/posts?tag=${tag}`
          );
        }
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setError(error);
      }
    };

    fetchPosts();
  }, [tag]);

  return (
    <div className="container">
      <h2 className="text-center my-4">{tag === "untagged" ? "Untagged Posts" : `"${tag}"`}</h2>
      {error ? (
        <div className="alert alert-danger" role="alert">
          Error fetching posts: {error.message}
        </div>
      ) : (
        <div className="row">
          {posts.map((post) => (
            <div key={post._id} className="col-md-4 col-lg-3 mb-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{post.title}</h5>
                  <p className="card-text">{post.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TagPosts;
