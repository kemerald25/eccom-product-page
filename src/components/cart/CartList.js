import React from "react";
import CartItem from "./CartItem";

export default function CartList({ value }) {
  const { getCart } = value;
  return (
    <div className="container-fluid">
      {getCart().map((item) => {
        return <CartItem key={item.id} item={item} value={value} />;
      })}
    </div>
  );
}
