//src/pages/TagList.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./TagList.css";

const TagList = () => {
  const [tags, setTags] = useState([]);
  
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await axios.get(
          "https://yasamannetserver-0b9ae46e8ccd.herokuapp.com/tags"
        );
        setTags(response.data);
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    };

    fetchTags();
  }, []);

  return (
    <>
    <div className="tag-list">
      <h2 className="blog_title text-center">نمونه کارها</h2>
      <nav className="menu">
        <ol>
          {tags.map((tag) => (
            <li key={tag} className="menu-item">
              <Link to={`/tags/${tag}`}>{tag}</Link>
            </li>
          ))}
        </ol>
      </nav>
      </div>
    </>
  );
};

export default TagList;
