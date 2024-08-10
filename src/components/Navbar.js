import React, { useState, useEffect } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import axios from "axios";
import "./Navbar.css";

const Navigation = () => {
  const isAuth = !!localStorage.getItem("token");
  const [allPosts, setAllPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);

  // Fetch all posts when component mounts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          "https://yasamannetserver-0b9ae46e8ccd.herokuapp.com/posts"
        );
        setAllPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  // Filter posts based on search query
  useEffect(() => {
    const filtered = allPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPosts(filtered);
  }, [searchQuery, allPosts]);

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Highlight search query in text
  const highlightQuery = (text, query) => {
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, index) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <span key={index} className="highlight">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <Navbar bg="light" expand="lg" className="shadow-sm">
      <Navbar.Brand as={NavLink} to="/home" className="font-weight-bold">
        یاسمن چوبه
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link as={NavLink} to="/" className="mx-2">
            بلاگ
          </Nav.Link>
          <Nav.Link as={NavLink} to="/home" className="mx-2">
            <i className="fa-solid fa-house"></i>
          </Nav.Link>
          {isAuth && (
            <Nav.Link as={NavLink} to="/new" className="mx-2">
              ایجاد
            </Nav.Link>
          )}
          <div className="search-container mx-2 position-relative">

            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="search-input form-control card-search"
            />
            {searchQuery && (
              <ul className="search-results list-group position-absolute">
                {filteredPosts.map((post) => (
                  <li key={post._id} className="list-group-item">
                    <NavLink to={`/posts/${post._id}`}>
                      {highlightQuery(post.title, searchQuery)}
                    </NavLink>
                  </li>
                ))}
              </ul>
            )}
          </div>
            <i className="fa fa-search search-icon"></i>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;
