import { useState } from "react";
import { Navbar, Nav, NavDropdown, Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";

function Header() {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const userName = localStorage.getItem("firstName");

  const handleLogout = () => {
    setLoader(true);
    localStorage.clear();
    setTimeout(() => {
      navigate("/", { replace: true });
    }, 100);
    setLoader(false);
  };

  return (
    <>
      {loader ? (
        <LoadingSpinner />
      ) : (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Container>
            <Navbar.Brand>Task Management App</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="text-capitalize ms-auto text-center">
                <NavDropdown title={userName} id="collasible-nav-dropdown">
                  <NavDropdown.Item onClick={() => handleLogout()}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      )}
    </>
  );
}

export default Header;
