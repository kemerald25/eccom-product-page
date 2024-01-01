import React from "react";
import { ProductConsumer } from "../../Context";

export default function CartCount() {
  return (
    <div>
      <ProductConsumer>
        {(value) => {
          const { getCount } = value;

          return getCount();
        }}
      </ProductConsumer>
    </div>
  );
}
