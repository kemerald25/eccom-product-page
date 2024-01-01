import React from "react";
import useCheckout from "bani-react";

export default function Bani({ total, clearCart, history }) {
  const { BaniPopUp } = useCheckout();

  const totalInDollars = total;
  const exchangeRate = 1150;
  const totalInNaira = totalInDollars * exchangeRate;

  const handleOnClose = (response) => {
    console.log("On close: ", response);
  };

  const handleOnSuccess = (response) => {
    console.log("On Success: ", response);

    clearCart();
    history.push("/");
  };

  const handleSubmit = () => {
    BaniPopUp({
      amount: totalInNaira.toFixed(2),
      phoneNumber: "0802 123 4567",
      email: "kickass@startlord3000.com",
      firstName: "Star",
      lastName: "Lord",
      merchantKey: "pub_test_RKP5KXS9MKV72MJZ2Y7N2", //The merchant Bani public key
      metadata: { custom_ref: "custom_ref" },
      onClose: handleOnClose,
      callback: handleOnSuccess,
    });
  };
  return (
    <div>
      <button
        className="px-5 py-1 rounded-pill outline-none btn-pay btn-pay:hover"
        onClick={handleSubmit}
      >
        pay here
      </button>
    </div>
  );
}
