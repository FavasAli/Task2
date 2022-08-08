import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { login } from "../actions/userActions.js";
import { useDispatch, useSelector } from "react-redux";
import {useNavigate} from 'react-router-dom'
import Loader from '../components/Loader.js'
import Message from '../components/Message.js'

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, userInfo, error } = userLogin;

  const dispatch = useDispatch();
  const navigate=useNavigate()

  useEffect(() => {
    console.log("useEffect usrinfo",userInfo)
      if(userInfo){
        navigate('/')
      }
  }, [userInfo,navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };
  return (
    <Container>
      <Row className="mt-3">
        {loading && <Loader/>}
        {error && <Message variant="danger">{error}</Message>}
        <h1 style={{"textAlign":"center"}}>Login</h1>
        <Col md={2} lg={2}></Col>
        <Col md={8} lg={8}>

          <Form onSubmit={submitHandler}>
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

            <Button type="submit" variant="primary">
              Login
            </Button>
          </Form>
        </Col>
        <Col md={2} lg={2}></Col>
      </Row>
    </Container>
  );
};

export default LoginScreen;
