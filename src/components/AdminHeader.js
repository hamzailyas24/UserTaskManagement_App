import { useState } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function AdminHeader() {
  const [loader, setLoader] = useState(false);
  const adminName = localStorage.getItem("admin_name");
  const navigate = useNavigate();
  const handleLogout = () => {
    setLoader(true);
    localStorage.removeItem("admin_id");
    localStorage.removeItem("admin_name");
    setTimeout(() => {
      navigate("/admin", { replace: true });
    }, 100);
    setLoader(false);
  };

  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>Admin Panel</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="text-capitalize ms-auto text-center">
              <NavDropdown title={adminName} id="collasible-nav-dropdown">
                <NavDropdown.Item onClick={() => handleLogout()}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default AdminHeader;
