import React, { useEffect, useState } from "react"
import { Form, Container, Row, Col, Button } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import Loader from "../components/Loader"
import Message from "../components/Message"
import { addProducts } from "../actions/productActions"
import { ADD_PRODUCT_RESET } from "../constants/productConstants"
import { LinkContainer } from "react-router-bootstrap"

const AddProduct = () => {
  const [name, setName] = useState("")
  const [price, setPrice] = useState()
  const [quantity, setQty] = useState()
  const [category, setCategory] = useState("")

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const addProduct = useSelector((state) => state.addProduct)
  const { loading, products, error } = addProduct

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch({ type: ADD_PRODUCT_RESET })
    console.log("userInfo", userInfo)
    if (!userInfo) {
      navigate("/login")
    }
    console.log("products", products)
    if (products) {
      navigate("/")
    }
  }, [userInfo, navigate, products])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(addProducts(name, price, quantity, category))
  }
  return (
    <Container>
      <h1 style={{ textAlign: "center" }}>ADD PRODUCTS</h1>
      <Row>
        <Col md={2} lg={2}></Col>
        <Col md={8} lg={8}>
          {loading && <Loader />}
          {error && <Message variant="danger">{error}</Message>}

          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                placeholder="Enter the name"
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="price">
              <Form.Label>price</Form.Label>
              <Form.Control
                type="text"
                value={price}
                placeholder="Enter price"
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="qty">
              <Form.Label>qty</Form.Label>
              <Form.Control
                type="text"
                value={quantity}
                placeholder="Enter qty"
                onChange={(e) => setQty(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="category">
              <Form.Label>category</Form.Label>
              <Form.Control
                type="text"
                value={category}
                placeholder="Enter here"
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Row>
              <Col >
                <Button type="submit" variant="primary">
                  Save
                </Button>
              </Col>
              <Col ></Col>
              <Col ></Col>
              <Col >
                {" "}
                <LinkContainer to={"/"}>
                  <Button variant="dark" className="btn">
                    View products
                  </Button>
                </LinkContainer>
              </Col>
            </Row>
          </Form>
        </Col>
        <Col md={2} lg={2}></Col>
      </Row>
    </Container>
  )
}

export default AddProduct
