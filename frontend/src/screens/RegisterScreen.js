import React, { useState, useEffect } from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { register } from "../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from '../components/Loader.js'
import Message from '../components/Message.js'

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [place, setPlace] = useState("");

  const registerUser = useSelector((state) => state.registerUser);
  const { loading, error, userInfo } = registerUser;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const redirect = window.location.search ? window.location.search.split("=")[1] : "/";


  useEffect(() => {
    console.log("userInfo",userInfo)
    if (userInfo) {
      navigate('/login');
    }
  }, [userInfo, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(register(name, email, password,place));
  };
  return (
    <Container>
      <Row>
        {loading && <Loader/>}
        {error && <Message variant='danger'>{error}</Message>}
        <h1 style={{ textAlign: "center" }}>Register</h1>
        <Col md={3} lg={3}></Col>
        <Col md={6} lg={6}>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                value={name}
                placeholder="Enter your name"
                type="text"
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                value={email}
                placeholder="Enter your email"
                type="text"
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                value={password}
                placeholder="Enter your password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>Place</Form.Label>
              <Form.Control
                value={place}
                placeholder="Enter your place"
                type="text"
                onChange={(e) => setPlace(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Button type="submit" variant="primary">
              Register
            </Button>
          </Form>
        </Col>
        <Col md={3} lg={3}></Col>
      </Row>
    </Container>
  );
};

export default RegisterScreen;
