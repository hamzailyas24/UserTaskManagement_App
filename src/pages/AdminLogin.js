import { useState, useEffect } from "react";
import { Form, Button, Container, Col, Row, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import axios from "axios";

function AdminLogin() {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async () => {
    try {
      setLoader(true);
      const response = await axios.post(
        "https://usertaskmanagement.herokuapp.com/admin/login",
        {
          username: username,
          password: password,
        }
      );
      // console.log("response ===>", response.data);
      if (response.data.status === true) {
        localStorage.setItem("admin_id", response.data.admin.admin_id);
        localStorage.setItem("admin_name", response.data.admin.username);
        navigate("/dashboard");
      } else {
        setError(true);
        setErrorMessage(response.data.message);
      }
      setLoader(false);
    } catch (error) {
      setError(true);
      setErrorMessage("Something went wrong, Internal server error");
      console.log(error);
      setLoader(false);
    }
  };

  const redirect = () => {
    const adminID = localStorage.getItem("admin_id");
    if (adminID) {
      navigate("/dashboard");
    } 
  };

  useEffect(() => {
    if (localStorage.getItem("admin_id")) {
      redirect();
    }
  }, []);

  return (
    <>
      {loader ? (
        <LoadingSpinner />
      ) : (
        <Container>
          <h1 className="shadow mt-5 p-3 text-center rounded bg-dark text-white">
            ADMIN LOGIN
          </h1>
          <Row className="mt-3">
            <Col lg={5} md={6} sm={12} className="p-5 m-auto shadow-sm rounded">
              {error ? (
                <Alert variant="danger">
                  <i className="fas fa-exclamation-triangle"></i>
                  <span className="ms-2 text-capitalize fw-bold">
                    {errorMessage}
                  </span>
                </Alert>
              ) : null}

              <Form.Group className="mt-2">
                <Form.Label>Username:</Form.Label>
                <Form.Control
                  type="text"
                  className="shadow-none border-dark rounded-0"
                  placeholder="username"
                  onChange={(e) => setUsername(e.target.value.toLowerCase())}
                />
              </Form.Group>

              <Form.Group className="mt-2">
                <Form.Label>Password:</Form.Label>
                <Form.Control
                  type="password"
                  className="shadow-none border-dark rounded-0"
                  placeholder="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              <div className="d-grid gap-2 mt-3">
                <Button
                  style={{ background: "black", border: "1px solid #000" }}
                  className="rounded-0 shadow-none"
                  size="lg"
                  onClick={handleLogin}
                >
                  Login
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
}

export default AdminLogin;
