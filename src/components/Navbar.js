import React, { Component } from "react";
import { Link } from "react-router-dom";
import Logo from "../logo.svg";
// import styled from "styled-components";
import { ButtonContainer } from "./Button";

export default class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-primary px-sm-5">
        {/* https://www.iconfinder.com/icons/1243689/call_phone_icon
Creative Commons (Attribution 3.0 Unported);
https://www.iconfinder.com/Makoto_msk */}

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
            <span className="me-2">
              <i className="fas fa-cart-plus" />
            </span>
            my cart
          </ButtonContainer>
        </Link>
      </nav>
    );
  }
}
