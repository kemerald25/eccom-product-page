import React, { Component } from "react";
import fetchProductDetails from "./data";

const ProductContext = React.createContext();

class ProductProvider extends Component {
  state = {
    products: [],
    detailProduct: fetchProductDetails,
    cart: [],
    modalOpen: false,
    modalProduct: fetchProductDetails,
    cartSubTotal: 0,
    cartTax: 0,
    cartTotal: 0,
  };

  componentDidMount() {
    this.fetchProducts();
  }

  fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/products");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const products = await response.json();
      this.setState({ products });
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  getItem = (id) => {
    const product = this.state.products.find((item) => item.id === id);
    return product;
  };

  handleDetail = async (id) => {
    try {
      const detailedProduct = await fetchProductDetails(id);

      this.setState(() => {
        return { detailProduct: detailedProduct };
      });
    } catch (error) {
      console.error('Error fetching detailed product:', error);
    }
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
    let tempCart = [...this.state.cart];
    let tempProducts = [...this.state.products];

    const index = tempProducts.findIndex((item) => item.id === id);
    const product = tempProducts[index];

    product.inCart = true;
    product.count = 1;
    const price = product.price;
    product.total = price;

    tempCart = [...tempCart, product];

    this.setState(
      (prevState) => {
        const updatedProducts = [...prevState.products];
        updatedProducts[index] = { ...updatedProducts[index], inCart: true };

        return { products: updatedProducts, cart: tempCart, modalProduct: product };
      },
      () => {
        this.addTotals();
        this.openModal(id);
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
    this.getCart().forEach((item) => (subTotal += item.total));
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
          ...this.state,
          handleDetail: this.handleDetail,
          inCart: this.inCart,
          addToCart: this.addToCart,
          getCount: this.getCount,
          getCart: this.getCart,
          openModal: this.openModal,
          closeModal: this.closeModal,
          increment: this.increment,
          decrement: this.decrement,
          removeItem: this.removeItem,
          clearCart: this.clearCart,
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
