import React from "react";
import { useNavigate } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBlog } from "@fortawesome/free-solid-svg-icons";

const Navigation = () => {
  const navigate = useNavigate();
  const isAuth = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/myblog");
  };

  const handleStoreAlert = (e) => {
    e.preventDefault();
    alert("به زودی!😊");
  };

  return (
    <Navbar bg="none" expand="lg" className="justify-content-between px-3">
      <Navbar.Brand as={NavLink} to="/myblog">
        <FontAwesomeIcon icon={faBlog} /> بلاگ من
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-center">
        <Nav>
          {isAuth && (
            <Nav.Link as={NavLink} to="/new">
              ایجاد{" "}
            </Nav.Link>
          )}
           <Nav.Link as={NavLink} to="/store" onClick={handleStoreAlert}>
            فروشگاه
          </Nav.Link>
          {/* <Nav.Link as={NavLink} to="/myblog">
            خانه
          </Nav.Link> */}
          {!isAuth ? (
            <Nav.Link as={NavLink} to="https://yasaman.net">
              سایت اصلی {" "}
            </Nav.Link>
          ) : (
            <Nav.Link onClick={handleLogout}>خروج</Nav.Link>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;
