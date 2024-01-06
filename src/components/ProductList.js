import React, { Component } from "react";
import Product from "./Product";
import Title from "./Title";

import { ProductConsumer } from "../Context";

export default class ProductList extends Component {

   // Ensure you have a state to store the products
   state = {
    products: [],
  };

  // Function to update products based on the passed callback
  updateProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/products');  // Replace with your actual API endpoint
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const products = await response.json();
      this.setState({ products });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  componentDidMount() {
    // Fetch initial data on component mount
    this.updateProducts();
  }
  render() {
    return (
      <React.Fragment>
        <div className="py-5">
          <div className="container">
            <Title name="our" title="products" />
            {/* product row */}
            <div className="row">
              <ProductConsumer>
                {(value) => {
                  return value.products.map((product) => {
                    return <Product key={product.id} product={product} />;
                  });
                }}
              </ProductConsumer>
            </div>
          </div>
        </div>
      </React.Fragment>

      // <Product />
    );
  }
}