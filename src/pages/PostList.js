import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { format } from "date-fns";
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
  const [selectedPost, setSelectedPost] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleClose = () => setSelectedPost(null);
  const handleShow = (post) => setSelectedPost(post);

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

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    const token = localStorage.getItem("token");
    try {
      await axios.delete(
        `https://yasamannetserver-0b9ae46e8ccd.herokuapp.com/posts/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPosts(posts.filter((post) => post._id !== id));
    } catch (err) {
      console.error("Error deleting post:", err);
    }
  };

  const isAuth = !!localStorage.getItem("token");

  const searchFilter = (post) => {
    const term = searchTerm.trim().toLowerCase();
    return (
      post.title.toLowerCase().includes(term) ||
      post.content.toLowerCase().includes(term)
    );
  };

  const handleShare = (postId) => {
    const url = `${window.location.origin}/posts/${postId}`;
    if (navigator.share) {
      navigator
        .share({
          title: "Check out this post",
          url: url,
        })
        .catch((error) => console.error("Error sharing", error));
    } else {
      navigator.clipboard.writeText(url).then(() => {
        alert("Link copied to clipboard!");
      });
    }
  };

  return (
    <div className="container">
      <h2 className="text-center my-4 welcome-title">Welcome to my Blog</h2>
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
      <div className="row">
        <div className="col-md-4 col-lg-3 mb-4">
          <div className="list-group">
            <caption className="post-list_header">Posts</caption>
            {posts.filter(searchFilter).map((post) => (
              <button
                key={post._id}
                onClick={() => handleShow(post)}
                className="list-group-item list-group-item-action"
              >
                {truncate(post.title, 20)}
              </button>
            ))}
          </div>
        </div>
        <div className="col-md-8 col-lg-9">
          <div className="row">
            {posts.filter(searchFilter).map((post) => (
              <div
                key={post._id}
                className="col-md-6 col-lg-4 mb-4"
                onClick={() => handleShow(post)}
              >
                <div className="card h-100 shadow-sm post-card">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="card-img-top"
                  />

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
                    {isAuth && (
                      <div className="d-flex justify-content-between mt-2">
                        <Link
                          to={`/edit/${post._id}`}
                          className="btn btn-primary"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={(e) => handleDelete(post._id, e)}
                          className="btn btn-danger"
                        >
                          Delete
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
      {selectedPost && (
        <Modal
          show={true}
          onHide={handleClose}
          dialogClassName="custom-modal-size"
        >
          <Modal.Header closeButton>
            <Modal.Title
              style={{
                direction: isPersian(selectedPost.title) ? "rtl" : "ltr",
              }}
            >
              {selectedPost.title}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body
            style={{
              direction: isPersian(selectedPost.content) ? "rtl" : "ltr",
            }}
          >
            <img
              src={selectedPost.imageUrl}
              alt={selectedPost.title}
              className="modal-img"
            />
            <div
              dangerouslySetInnerHTML={{ __html: selectedPost.content }}
            ></div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() => handleShare(selectedPost._id)}
            >
              Share
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default PostList;
