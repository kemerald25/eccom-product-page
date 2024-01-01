import React, { Component } from "react";
import { Link } from "react-router-dom";
import Logo from "../logo.svg";
import styled from "styled-components";
import { ButtonContainer } from "./Button";
import { ProductConsumer } from "../Context";
import CartCount from "./cart/CartCount";

export default class Navbar extends Component {
  render() {
    return (
      <ProductConsumer>
        {(context) => (
          <NavWrapper className="navbar navbar-expand-sm navbar-dark  px-sm-5">
            <Link to="/">
              <img src={Logo} alt="logo" className="navbar-brand" />
            </Link>
            <ul className="navbar-nav align-items-center ">
              <li className="nav-item ms-5 ">
                <Link to="/" className="nav-link ">
                  products
                </Link>
              </li>
            </ul>

            <Link to="/cart" className="ms-auto">
              <ButtonContainer>
                <span className="position-relative me-2">
                  <i className="fas fa-cart-plus" />
                  <span className="position-absolute start-0 bottom-50 bg-danger crt-updt text-white">
                    <CartCount />
                  </span>
                </span>
                my cart
              </ButtonContainer>
            </Link>
          </NavWrapper>
        )}
      </ProductConsumer>
    );
  }
}

const NavWrapper = styled.nav`
  background: var(--mainBlue);
  .nav-link {
    color: var(--mainWhite) !important;
    font-size: 1.3rem;
    text-transform: capitalize;
  }
`;
