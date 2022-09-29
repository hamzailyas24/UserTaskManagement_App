import axios from "axios";
import React, { useState } from "react";
import { Container, Row, Col, Alert, Form, Button } from "react-bootstrap";
import LoadingSpinner from "../components/LoadingSpinner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const baseURL = "https://usertaskmanagement.herokuapp.com/signup";

function Signup() {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignup = async () => {
    if (
      firstName === "" ||
      lastName === "" ||
      email === "" ||
      password === ""
    ) {
      alert("Please fill all the fields");
    } else {
      try {
        setLoader(true);
        const response = await axios.post(baseURL, {
          first_name: firstName,
          last_name: lastName,
          email: email,
          password: password,
        });
        if (response.data.status === true) {
          alert(response.data.message);
          navigate("/");
          setLoader(false);
        } else {
          setError(true);
          setErrorMessage(response.data.message);
          alert(errorMessage);
          setLoader(false);
        }
      } catch (error) {
        console.log(error);
        setError(true);
        setErrorMessage("Something went wrong, Internal server error");
        alert(errorMessage);
        setLoader(false);
      }
    }
  };

  useEffect(() => {
    if (localStorage.getItem("userID")) {
      navigate("/userapp");
    }
  }, []);

  return (
    <>
      {loader ? (
        <LoadingSpinner />
      ) : (
        <Container>
          <h1 className="shadow mt-4 p-3 text-center rounded bg-dark text-white">
            Signup Here
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
              <Form.Group>
                <Form.Label>First Name: </Form.Label>
                <Form.Control
                  type="name"
                  className="shadow-none border-dark rounded-1"
                  placeholder="First Name"
                  onChange={(e) => setFirstName(e.target.value.toLowerCase())}
                />
              </Form.Group>

              <Form.Group className="mt-2">
                <Form.Label>Last Name: </Form.Label>
                <Form.Control
                  type="name"
                  className="shadow-none border-dark rounded-1"
                  placeholder="Last Name"
                  onChange={(e) => setLastName(e.target.value.toLowerCase())}
                />
              </Form.Group>

              <Form.Group className="mt-2">
                <Form.Label>Email: </Form.Label>
                <Form.Control
                  type="email"
                  className="shadow-none border-dark rounded-1"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value.toLowerCase())}
                />
              </Form.Group>

              <Form.Group className="mt-2">
                <Form.Label>Password: </Form.Label>
                <Form.Control
                  type="password"
                  className="shadow-none border-dark rounded-1"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              <div className="d-grid gap-2 mt-3">
                <Button
                  style={{
                    background: "black",
                    border: "1px solid #000",
                    cursor: "pointer",
                  }}
                  className="rounded-1 shadow-none"
                  size="lg"
                  onClick={handleSignup}
                >
                  CREATE ACCOUNT
                </Button>
              </div>

              <div className="text-center mt-3">
                <span
                  className="text-center text-primary text-decoration-underline"
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate("/")}
                >
                  Already have an Account ? Login Here.
                </span>
              </div>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
}

export default Signup;
