import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";
// import { render } from "@testing-library/react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";

import Details from "./components/Details";
import Cart from "./components/cart/Cart";
import Default from "./components/Default";
import Modal from "./components/Modal";
import AddProduct from '../src/components/AddProduct';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Navbar />
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/details" element={<Details />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<Default />} />
          <Route path="/add-product" element={<AddProduct />} />
        </Routes>
        <Modal />
      </React.Fragment>
    );
  }
}

export default App;
