import React, { Component } from "react";
import { storeProducts, detailProduct } from "./data";

const ProductContext = React.createContext();

class ProductProvider extends Component {
  state = {
    products: [],
    detailProduct: detailProduct,
    cart: [],
    modalOpen: false,
    modalProduct: detailProduct,
    cartSubTotal: 0,
    cartTax: 0,
    cartTotal: 0,
  };

  // mounts the products
  componentDidMount() {
    this.setProducts();
  }

  //   setting the method to fetch the products
  setProducts = () => {
    let tempProducts = [];
    storeProducts.forEach((item) => {
      const singleItem = { ...item };
      tempProducts = [...tempProducts, singleItem];
    });

    this.setState(() => {
      return { products: tempProducts };
    });
  };

  getItem = (id) => {
    const product = this.state.products.find((item) => item.id === id);
    return product;
  };
  // setting up the methods
  handleDetail = (id) => {
    const product = this.getItem(id);
    this.setState(() => {
      return { detailProduct: product };
    });
  };

  inCart = (id) => {
    const cart = localStorage.getItem("cart");
    if (cart) {
      const formatted = JSON.parse(cart);
      return formatted.filter((item) => item.id === id).length > 0;
    }
    return false;
  };

  addToCart = (id) => {
    let tempCart = [];
    const cart = localStorage.getItem("cart");
    if (cart) {
      const formatted = JSON.parse(cart);
      tempCart.push(...formatted);
    }
    if (this.inCart(id)) return;
    let tempProducts = [...this.state.products];
    const index = tempProducts.indexOf(this.getItem(id));
    const product = tempProducts[index];
    product.inCart = true;
    product.count = 1;
    const price = product.price;
    product.total = price;
    tempCart.push(product);

    this.setState(
      () => {
        return { products: tempProducts, cart: [...this.state.cart, product] };
      },
      () => {
        this.addTotals();
      }
    );

    localStorage.setItem("cart", JSON.stringify(tempCart));
  };

  getCount = () => {
    return this.getCart().length;
  };

  getCart = () => {
    const cart = localStorage.getItem("cart");
    if (cart) {
      return JSON.parse(cart);
    }

    return [];
  };

  openModal = (id) => {
    const product = this.getItem(id);
    this.setState(() => {
      return { modalProduct: product, modalOpen: true };
    });
  };

  closeModal = () => {
    this.setState(() => {
      return { modalOpen: false };
    });
  };

  increment = (id) => {
    const cart = this.getCart();
    cart.forEach((item) => {
      if (item.id === id) {
        ++item.count;
        item.total = item.count * item.price;
      }
    });

    localStorage.setItem("cart", JSON.stringify(cart));

    this.setState(
      () => {
        return { cart };
      },
      () => {
        this.addTotals();
      }
    );
  };

  decrement = (id) => {
    const cart = this.getCart();
    cart.forEach((item) => {
      if (item.id === id) {
        if (item.count <= 1) {
          return;
        }
        --item.count;

        item.total = item.count * item.price;
      }
    });

    localStorage.setItem("cart", JSON.stringify(cart));
    this.setState(
      () => {
        return { cart };
      },
      () => {
        this.addTotals();
      }
    );
    // }
  };

  removeItem = (id) => {
    let tempCart = [];
    const cart = localStorage.getItem("cart");
    if (cart) {
      const formatted = JSON.parse(cart);
      tempCart.push(...formatted);
    }

    const newCart = tempCart.filter((item) => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(newCart));

    this.setState(
      () => {
        return {
          cart: [...tempCart],
        };
      },
      () => {
        this.addTotals();
      }
    );
  };

  clearCart = () => {
    localStorage.setItem("cart", "[]");
    this.setState(
      () => {
        return { cart: [] };
      },
      () => {
        this.addTotals();
      }
    );
  };

  addTotals = () => {
    const { cartSubTotal, cartTax, cartTotal } = this.getTotals();

    this.setState(() => {
      return {
        cartSubTotal,
        cartTax,
        cartTotal,
      };
    });
  };
  getTotals = () => {
    let subTotal = 0;
    this.getCart().map((item) => (subTotal += item.total));
    const tempTax = subTotal * 0.1;
    const tax = parseFloat(tempTax.toFixed(2));
    const total = subTotal + tax;

    return {
      cartSubTotal: subTotal,
      cartTax: tax,
      cartTotal: total,
    };
  };

  render() {
    return (
      <ProductContext.Provider
        value={{
          // setting up the states
          ...this.state,
          handleDetail: this.handleDetail,
          addToCart: this.addToCart,
          openModal: this.openModal,
          closeModal: this.closeModal,
          increment: this.increment,
          decrement: this.decrement,
          removeItem: this.removeItem,
          clearCart: this.clearCart,
          getCount: this.getCount,
          getCart: this.getCart,
          inCart: this.inCart,
          getTotals: this.getTotals,
        }}
      >
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };
