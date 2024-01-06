// Product.js
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ProductConsumer } from '../Context';
import PropTypes from 'prop-types';
import ItemForm from './ItemForm';

const Product = ({ product }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch data from MongoDB when the component mounts
    const fetchData = async () => {
      try {
        const response = await fetch('https://localhost:5000/api/products'); // Replace with your actual API endpoint
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Run this effect only once when the component mounts

  return (
    <ProductWrapper className="col-9 mx-auto col-md-6 col-lg-3 my-3">
      <div className="card">
        <ProductConsumer>
          {(value) => (
            <div
              className="img-container p-5"
              onClick={() => value.handleDetail(product.id)}
            >
              <Link to="/details">
                <img src={product.img} alt="img" className="card-img-top" />
              </Link>

              <button
                className="cart-btn"
                disabled={value.inCart(product.id) ? true : false}
                onClick={() => {
                  value.addToCart(product.id);
                  value.openModal(product.id);
                }}
              >
                {value.inCart(product.id) ? (
                  <p className="text-capitalize mb-0" disabled>
                    {' '}
                    in cart
                  </p>
                ) : (
                  <i className="fas fa-cart-plus" />
                )}
              </button>
            </div>
          )}
        </ProductConsumer>
        {/* card footer */}
        <div className="card-footer d-flex justify-content-between">
          <p className="align-self-center mb-0">{product.title}</p>

          <h5 className="text-blue font-italic mb-0">
            <span className="me-1">$</span>
            {product.price}
          </h5>
        </div>
      </div>
      {/* ItemForm Interface */}
      <ItemForm onAddItem={(newItem) => setProducts([...products, newItem])} />
      {/* Link to AddProduct page */}
      <Link to="/add-product">Go to AddProduct</Link>
    </ProductWrapper>
  );
};

Product.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number,
    img: PropTypes.string,
    title: PropTypes.string,
    price: PropTypes.number,
    inCart: PropTypes.bool,
  }).isRequired,
};

const ProductWrapper = styled.div`
  .card {
    border-color: transparent;
    transition: all 1s linear;
  }

  .card-footer {
    background: transparent;
    border-top: transparent;
    transition: all 1s linear;
  }

  &:hover {
    .card {
      border: 0.04rem solid rgb(0, 0, 0, 0.2);
      box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.2);
    }

    .card-footer {
      background: rgba(247, 247, 247);
    }
  }

  .img-container {
    position: relative;
    overflow: hidden;
  }

  .card-img-top {
    transition: all 1s linear;
  }

  .img-container:hover .card-img-top {
    transform: scale(1.2);
  }

  .cart-btn {
    position: absolute;
    bottom: 0;
    right: 0;
    padding: 0.2rem 0.4rem;
    background: var(--lightBlue);
    color: var(--mainWhite);
    border: none;
    font-size: 1.4rem;
    border-radius: 0.5rem 0 0 0;
    transform: translate(100%, 100%);
    transition: all 1s linear;
  }

  .img-container:hover .cart-btn {
    transform: translate(0, 0);
  }

  .cart-btn:hover {
    color: var(--mainBlue);
    cursor: pointer;
  }
`;
