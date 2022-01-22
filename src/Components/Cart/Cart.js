import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import React, { useContext, useState } from "react";
import CartContext from "../../Store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
  const [onCheckout, setOnCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const ctx = useContext(CartContext);
  const totalAmount = `$${ctx.totalAmount.toFixed(2)}`;
  const onRemoveHandler = (id) => {
    ctx.removeItem(id);
  };
  const onAddHandler = (item) => {
    ctx.addItem({ ...item, amount: 1 });
  };
  const onOrderHandler = () => {
    setOnCheckout(true);
  };
  const onSubmitOrder = async (userData) => {
    setIsSubmitting(true);
    const response = await fetch(
      "https://react-wasd-default-rtdb.firebaseio.com/orders.json/",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderedItems: ctx.items,
        }),
      }
    );
    if (!response.ok) {
      return;
    }
    setDidSubmit(true);
    setIsSubmitting(false);
  };
  const hasItems = ctx.items.length > 0;
  const cartItems = ctx.items.map((item) => {
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

  const modalContent = (
    <div>
      <ul className={classes["cart-items"]}>{cartItems}</ul>
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {onCheckout && (
        <Checkout onCancel={props.onClose} onConfirm={onSubmitOrder} />
      )}
      {!onCheckout && (
        <div className={classes.actions}>
          <button onClick={props.onClose} className={classes["button--alt"]}>
            Close
          </button>
          {hasItems && (
            <button className={classes.button} onClick={onOrderHandler}>
              Order
            </button>
          )}
        </div>
      )}
    </div>
  );

  const submittingModal = <p>Order is being placed.</p>;

  const didSubmitModal = (
    <>
      <p>Order successfully placed.</p>
      <div className={classes.actions}>
        <button onClick={props.onClose} className={classes.button}>
          Close
        </button>
      </div>
    </>
  );

  return (
    <Modal onConfirm={props.onClose}>
      {!didSubmit && !isSubmitting && modalContent}
      {didSubmit && !isSubmitting && didSubmitModal}
      {isSubmitting && submittingModal}
    </Modal>
  );
};

export default Cart;
