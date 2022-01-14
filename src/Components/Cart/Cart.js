import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import React, { useContext } from "react";
import CartContext from "../../Store/cart-context";
import CartItem from "./CartItem";

const Cart = (props) => {
  const ctx = useContext(CartContext);
  const totalAmount = `$${ctx.totalAmount.toFixed(2)}`;
  const onRemoveHandler = (id) => {
    ctx.removeItem(id);
  };
  const onAddHandler = (item) => {
    ctx.addItem({ ...item, amount: 1 });
  };
  const hasItems = ctx.items.length > 0;
  const cartItems = ctx.items.map((item) => {
    // console.log(item.id);
    return (
      <CartItem
        key={item.id}
        name={item.name}
        price={item.price}
        amount={item.amount}
        onRemove={onRemoveHandler.bind(null, item.id)}
        onAdd={onAddHandler.bind(null, item)}
      ></CartItem>
    );
  });
  return (
    <Modal onConfirm={props.onClose}>
      <div>
        <ul className={classes["cart-items"]}>{cartItems}</ul>
        <div className={classes.total}>
          <span>Total Amount</span>
          <span>{totalAmount}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={props.onClose} className={classes["button--alt"]}>
            Close
          </button>
          {hasItems && <button className={classes.button}>Order</button>}
        </div>
      </div>
    </Modal>
  );
};

export default Cart;
