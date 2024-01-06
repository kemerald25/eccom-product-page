import React, { Component } from "react";
import Product from "./Product";
import Title from "./Title";
import { ProductConsumer } from "../Context";

class ProductList extends Component {
  state = {
    products: [], // Initialize an empty array for products
  };

  // Function to update the products in the state
  updateProducts = (products) => {
    this.setState({ products });
  };
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
                  return value.products.map((product) => (
                    <Product key={product.id} product={product} />
                  ));
                }}
              </ProductConsumer>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ProductList;
