import axios from "axios";
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Alert, Form, Button } from "react-bootstrap";
import LoadingSpinner from "../components/LoadingSpinner";
import { useNavigate } from "react-router-dom";

const baseURL = "http://localhost:4000/signup";

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
        // console.log("response ===>", response.data);
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

  return (
    <>
      {loader ? (
        <LoadingSpinner />
      ) : (
        <Container>
          <h1 className="shadow mt-5 p-3 text-center rounded bg-dark text-white">
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
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="name"
                  className="shadow-none border-dark rounded-0"
                  placeholder="First Name"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mt-2">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="name"
                  className="shadow-none border-dark rounded-0"
                  placeholder="Last Name"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Form.Group>

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
                  onClick={handleSignup}
                >
                  Signup
                </Button>
              </div>

                <div className="d-grid gap-2 mt-3">
                  <p className="text-center text-primary text-decoration-underline" onClick={() => navigate('/')}> Already have an Account ? Login Here. </p>
                </div>

            </Col>
          </Row>
        </Container>
      )}
    </>
  );
}

export default Signup;
