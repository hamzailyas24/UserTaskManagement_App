import React, { useState, useEffect } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import axios from "axios";
import { Navigate } from "react-router-dom";

const baseURL = "http://localhost:4000/login";

function AdminLogin() {
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); 

  // once user login successfully save the user_id in local storage whenever user open the app again or refresh the page it will automatically login the user again without the need to login again

  const handleLogin = async () => {
    if (email === "" || password === "") {
      setError(true);
      setErrorMessage("Please enter email and password");
    } else {
      setLoader(true);
      try {
        const response = await axios.post(
          "http://localhost:4000/login",
          {
            email: email,
            password: password,
          }
        );
        if (response.data.success === true) {
          localStorage.setItem("user", response.data.user);
        } else {
          setError(true);
          setErrorMessage(response.data.message);
        }
      } catch (error) {
        setError(true);
        setErrorMessage("Internal server error");
        console.log(error);
      }
      setLoader(false);
    }
  };

  return (
    <>
      {loader ? (
        <LoadingSpinner />
      ) : (
        <Container>
          <h1 className="shadow mt-5 p-3 text-center rounded bg-dark text-white">
            Admin Login
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
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
}

export default AdminLogin;
