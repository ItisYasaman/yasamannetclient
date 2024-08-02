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
    <div className="container">
      <h2 className="text-center my-4">بلاگ</h2>
      <div className="row">
        {tags.map((tag) => (
          <div key={tag} className="col-md-4 col-lg-3 mb-4">
            <Link to={`/tags/${tag}`} className="tag-card">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title text-center">{tag}</h5>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TagList;
