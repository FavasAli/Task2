import React, { useEffect } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {LinkContainer} from 'react-router-bootstrap'
import { useNavigate } from "react-router-dom";
import { listProducts, productDelete } from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";

const ListProductsScreen = () => {
  const viewProduct = useSelector((state) => state.viewProduct);
  const { loading, products, error } = viewProduct;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const deleteProduct = useSelector((state) => state.deleteProduct);
  const { success } = deleteProduct;

  const dispacth = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
    console.log("products from list products", products);
    dispacth(listProducts());
    if (!products) {
      navigate("/addproduct");
    }
  }, [dispacth, navigate, userInfo, success]);
  let index = 1;

  // const clickHandler = (e) => {
  //   e.preventDefault();
  //   navigate("/");
  // };

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure ?")) {
      dispacth(productDelete(id));
    }
  };
  return (
    <Container>
      <Table striped bordered hover size="sm">
        {loading && <Loader />}
        {error && <Message variant="danger">{error}</Message>}
        <thead>
          <tr>
            <th>##</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {products &&
            products.map((product) => (
              <tr key={product._id}>
                <td>{index++}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.quantity}</td>
                <td>{product.category}</td>
                <td>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(product._id)}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      <LinkContainer to={'/addproduct'}>
        <Button variant="dark" className="btn">
          Add more
        </Button>
      </LinkContainer>
    </Container>
  );
};

export default ListProductsScreen;
