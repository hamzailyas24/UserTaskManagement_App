import React, { useState, useEffect } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import axios from "axios";
import { Row, Container, Col, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
function Login() {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async () => {
    if (email === "" || password === "") {
      setError(true);
      setErrorMessage("Please fill all the fields");
    } else {
      try {
        setLoader(true);
        const response = await axios.post("https://usertaskmanagement.herokuapp.com/login", {
          email: email,
          password: password,
        });
        console.log("response ===>", response.data);
        if (response.data.status === true) {
          localStorage.setItem("userID", response.data.user.user_id);
          localStorage.setItem("firstName", response.data.user.first_name);
          localStorage.setItem("lastName", response.data.user.last_name);
          navigate("/userapp");
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
    }
  };

  const redirect = () => {
    const userID = localStorage.getItem("userID");
    if (userID) {
      navigate("/userapp");
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    redirect();
  }, []);
  return (
    <>
      {loader ? (
        <LoadingSpinner />
      ) : (
        <Container>
          <h1 className="shadow mt-5 p-3 text-center rounded bg-dark text-white">
            Login Here
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
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  className="shadow-none border-dark rounded-0"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mt-2">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  className="shadow-none border-dark rounded-0"
                  placeholder="Password"
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

              <div className="d-grid gap-2 mt-3">
                <Button
                  style={{ background: "black", border: "1px solid #000" }}
                  className="rounded-0 shadow-none"
                  size="lg"
                  onClick={() => navigate("/signup")}
                >
                  Signup
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
}

export default Login;
