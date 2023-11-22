import React, { Component } from "react";
import styled from "styled-components";
import { ProductConsumer } from "../Context";
import { ButtonContainer } from "./Button";
import { Link } from "react-router-dom";

export default class Modal extends Component {
  render() {
    return (
      <ProductConsumer>
        {(value) => {
          const { modalOpen, closeModal } = value;
          const { img, title, price } = value.modalProduct;

          if (!modalOpen) {
            return null;
          } else {
            return (
              <ModalContainer>
                <div className="row" id="modal">
                  <div className="col-10 mx-auto   text-center text-capitalize p-5">
                    <h5>Item added to the cart</h5>
                    <img src={img} className="img-fluid" alt="modal img" />
                    <h5>{title}</h5>
                    <h5 className="text-muted">price : $ {price} </h5>

                    <Link to="/">
                      <ButtonContainer onClick={() => closeModal()}>
                        Continue Shopping
                      </ButtonContainer>
                    </Link>

                    <Link to="/cart">
                      <ButtonContainer cart onClick={() => closeModal()}>
                        Go To Cart
                      </ButtonContainer>
                    </Link>
                  </div>
                </div>
              </ModalContainer>
            );
          }
        }}
      </ProductConsumer>
    );
  }
}

const ModalContainer = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;

  #modal {
    background: var(--mainWhite);
  }
`;
