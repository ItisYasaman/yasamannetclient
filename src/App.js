import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PostList from "./pages/PostList";
import PostForm from "./pages/PostForm";
import Login from "./pages/Login";
import PrivateRoute from "./pages/PrivateRoute";
import Navbar from "./components/Navbar";
import PostDetail from "./components/PostDetail";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import TagList from "./pages/TagList";
import "./App.css";

function App() {
  return (
    <>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} /> {/* Home page at the root */}
            <Route path="/home" element={<TagList />} />{" "}
            {/* Weblog shown at "/home" */}
            <Route path="/posts/:id" element={<PostDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/tags/:tag" element={<PostList />} />
            <Route path="/" element={<PrivateRoute />}>
              <Route path="/new" element={<PostForm />} />
              <Route path="/edit/:id" element={<PostForm />} />
            </Route>
          </Routes>
          <Footer />
          <a
            className="developer-link"
            href="https://itisyara.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Developed by: Yara
          </a>
        </div>
      </Router>
    </>
  );
}

export default App;
