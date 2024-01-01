import React from "react";
import { Link } from "react-router-dom";
// import PayPalButton from "./PayPalButton";
import Bani from "./Bani";

export default function CartTotals({ value, history }) {
  const { getTotals, clearCart } = value;
  const { cartSubTotal, cartTax, cartTotal } = getTotals();

  return (
    <React.Fragment>
      <div className="container">
        <div className="row align-items-end justify-content-end">
          <div className="col-10 mt-2 ms-sm-5 col-sm-8 text-capitalize">
            <div className="d-lg-flex justify-content-end flex-column align-items-end ">
              <Link to="/">
                <button
                  className="btn btn-outline-danger text-uppercase mb-3 px-5"
                  type="button"
                  onClick={() => clearCart()}
                >
                  clear cart
                </button>
              </Link>
              <h5>
                <span className="text-title">subtotal :</span>
                <strong>$ {cartSubTotal}</strong>
              </h5>
              <h5>
                <span className="text-title">tax :</span>
                <strong>$ {cartTax}</strong>
              </h5>
              <h5>
                <span className="text-title">total :</span>
                <strong>$ {cartTotal}</strong>
              </h5>
              <Bani total={cartTotal} clearCart={clearCart} history={history} />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
