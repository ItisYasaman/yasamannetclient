// src/components/PostCard.js

import React from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
// import "./PostCard.css";

function isPersian(str) {
  const persianRegex = /[\u0600-\u06FF]/;
  return persianRegex.test(str);
}

function truncate(str, no_chars) {
  return str.length > no_chars ? str.substring(0, no_chars) + "..." : str;
}

const PostCard = ({ post }) => {
  return (
    <div className="card h-100 shadow-sm post-card">
      <div
        className="card-body"
        style={{
          direction: isPersian(post.content) ? "rtl" : "ltr",
        }}
      >
        <h5 className="card-title">{post.title}</h5>
        <div className="card-text">
          <p
            className="truncate"
            dangerouslySetInnerHTML={{
              __html: truncate(post.content, 20) + "...",
            }}
          ></p>
          <p className="card-subtitle mb-2 text-muted date-text">
            {format(new Date(post.createdAt), "PPpp")}
          </p>
        </div>
        <Link to={`/posts/${post._id}`} className="btn btn-primary">
          Read More
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
