import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { format, parseISO } from "date-fns";
import "./PostList.css";

function isPersian(str) {
  const persianRegex = /[\u0600-\u06FF]/;
  return persianRegex.test(str);
}

function truncate(str, no_chars) {
  return str.length > no_chars ? str.substring(0, no_chars) + "..." : str;
}

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);
  const { tag } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          "https://yasamannetserver-0b9ae46e8ccd.herokuapp.com/posts"
        );
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No authentication token found");
      alert("You are not authenticated. Please log in.");
      return;
    }

    try {
      await axios.delete(
        `https://yasamannetserver-0b9ae46e8ccd.herokuapp.com/posts/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setPosts(posts.filter((post) => post._id !== id));
      handleCloseConfirm();
    } catch (err) {
      console.error("Error deleting post:", err);
      if (err.response && err.response.status === 401) {
        alert("Unauthorized: Please log in again.");
      } else {
        alert("An error occurred while deleting the post.");
      }
    }
  };

  const handleShowConfirm = (post, e) => {
    e.stopPropagation();
    setPostToDelete(post);
    setShowConfirm(true);
  };

  const handleCloseConfirm = () => {
    setPostToDelete(null);
    setShowConfirm(false);
  };

  const isAuth = !!localStorage.getItem("token");

  const searchFilter = (post) => {
    const term = searchTerm.trim().toLowerCase();
    return (
      post.title.toLowerCase().includes(term) ||
      post.content.toLowerCase().includes(term)
    );
  };

  const filteredPosts = posts.filter((post) => !tag || post.tags.includes(tag));

  const handlePostClick = (postId) => {
    navigate(`/posts/${postId}`);
  };

  return (
    <div className="container post-list_container">
      <h2 className="text-center my-4 welcome-title">
        {tag ? `"${tag}"` : ""}
      </h2>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control card-search"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="input-group-append">
          <button
            className="btn btn-outline-secondary btn-search"
            type="button"
          >
            <i className="fa fa-search"></i>
          </button>
        </div>
      </div>
      <div className="row post-list_row">
        <div className="col-md-4 col-lg-3 mb-0 post-list_sidebar">
          <div className="list-group">
            <caption className="post-list_header">مطالب</caption>
            {filteredPosts.filter(searchFilter).map((post) => (
              <button
                key={post._id}
                onClick={() => handlePostClick(post._id)}
                className="list-group-item list-group-item-action"
              >
                {truncate(post.title, 20)}
              </button>
            ))}
          </div>
        </div>
        <div className="col-md-8 col-lg-9 tag-cards_">
          <div className="row tag-cards_container">
            {filteredPosts.filter(searchFilter).map((post) => (
              <div
                key={post._id}
                className="col-4 col-md-4 col-lg-3 mb-4"
                onClick={() => handlePostClick(post._id)}
              >
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
                          __html: truncate(post.content, 20),
                        }}
                      ></p>
                      <p className="date__">
                        {format(parseISO(post.date), "yyyy MM dd")}
                      </p>
                    </div>
                    {isAuth && (
                      <div className="d-flex justify-content-between mt-2 edit-del_btn">
                        <Link
                          to={`/edit/${post._id}`}
                          className="btn btn-primary"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <i className="fa-solid fa-pen-to-square"></i>
                        </Link>
                        <button
                          onClick={(e) => handleShowConfirm(post, e)}
                          className="btn btn-danger"
                        >
                          <i className="fa-solid fa-trash"></i>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Modal show={showConfirm} onHide={handleCloseConfirm}>
        <Modal.Header closeButton>
          <Modal.Title>تأیید حذف</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          آیا مطمئن هستید که می‌خواهید این پست را حذف کنید؟
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseConfirm}>
            انصراف
          </Button>
          <Button
            variant="danger"
            onClick={() => handleDelete(postToDelete._id)}
          >
            حـــــذف
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PostList;
