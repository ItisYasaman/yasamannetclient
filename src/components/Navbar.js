import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navigation = () => {
  const isAuth = !!localStorage.getItem("token");

  return (
    <Navbar bg="light" expand="lg" className="shadow-sm">
      <Navbar.Brand as={NavLink} to="/home" className="font-weight-bold">
        یاسمن چوبه
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link as={NavLink} to="/myblog" className="mx-2">
            بلاگ
          </Nav.Link>
          <Nav.Link as={NavLink} to="/home" className="mx-2">
          <i class="fa-solid fa-house"></i>
          </Nav.Link>
          {isAuth && (
            <Nav.Link as={NavLink} to="/new" className="mx-2">
              ایجاد
            </Nav.Link>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;
