//src/pages/PostForm.js
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./PostForm.css";

let Font = ReactQuill.Quill.import("formats/font");
Font.whitelist = ["sans-serif", "vazir", "Times", "dast", "ava", "nastaliq"];
ReactQuill.Quill.register(Font, true);

const toolbarOptions = [
  ["bold", "italic", "underline", "strike"],
  ["blockquote", "code-block"],
  [{ header: 1 }, { header: 2 }],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ script: "sub" }, { script: "super" }],
  [{ indent: "-1" }, { indent: "+1" }],
  [{ direction: "rtl" }],
  [{ size: ["small", false, "large", "huge"] }],
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ color: [] }, { background: [] }],
  [{ font: ["sans-serif", "vazir", "Times", "dast", "ava", "nastaliq"] }],
  [{ align: [] }],
  ["clean"],
];

const tagOptions = [
  "Personal",
  "Poem",
  "Story",
  "شعر",
  "دلنوشته",
  "داستان",
];

const PostForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [selectedTag, setSelectedTag] = useState(tagOptions[0]);
  const [date, setDate] = useState("");
  const [addToManual, setAddToManual] = useState(false); // New state for checkbox
  const [error, setError] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      if (id) {
        const token = localStorage.getItem("token");
        try {
          const response = await axios.get(
            `https://yasamannetserver-0b9ae46e8ccd.herokuapp.com/posts/${id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setTitle(response.data.title);
          setContent(response.data.content);
          setImageUrl(response.data.imageUrl);
          setSelectedTag(response.data.tags[0] || tagOptions[0]);
          setDate(response.data.date ? response.data.date.split("T")[0] : "");
          setAddToManual(response.data.addToManual || false); // Fetch checkbox value if editing
        } catch (err) {
          console.error("Error fetching post data:", err);
          setError("Error fetching post data");
        }
      }
    };

    fetchPost();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const postData = {
      title,
      content,
      imageUrl,
      tags: [selectedTag],
      date,
      addToManual,
    };

    try {
      const url = id
        ? `https://yasamannetserver-0b9ae46e8ccd.herokuapp.com/posts/${id}`
        : "https://yasamannetserver-0b9ae46e8ccd.herokuapp.com/posts";
      const method = id ? "put" : "post";
      const response = await axios({
        method,
        url,
        data: postData,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log("Post successful:", response.data);
      setTitle("");
      setContent("");
      setImageUrl("");
      setDate("");
      setAddToManual(false);
      alert("Post created/updated successfully");
      navigate("/");
    } catch (err) {
      console.error("Error posting data:", err);
      setError("Request failed");
    }
  };

  const handleTagChange = (e) => {
    setSelectedTag(e.target.value);
  };

  const handleCheckboxChange = (e) => {
    setAddToManual(e.target.checked);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">{id ? "Edit Post" : "Create Post"}</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            className="form-control"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="imageUrl">Image URL</label>
          <input
            type="text"
            id="imageUrl"
            className="form-control"
            placeholder="Enter image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="tag">Tag</label>
          <select
            id="tag"
            className="form-control"
            value={selectedTag}
            onChange={handleTagChange}
          >
            {tagOptions.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            className="form-control"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Content</label>
          <ReactQuill
            id="content"
            value={content}
            onChange={setContent}
            modules={{ toolbar: toolbarOptions }}
            className="mb-3 bg-white content-container"
          />
        </div>
        <div className="form-group form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="addToManual"
            checked={addToManual}
            onChange={handleCheckboxChange}
          />
          <label className="form-check-label" htmlFor="addToManual">
            Add to Highlights on Home Page
          </label>
        </div>
        <button type="submit" className="submit-post_btn">
          {id ? "Update Post" : "Submit"}
        </button>
        <br/>
        <br/>
      </form>
    </div>
  );
};

export default PostForm;