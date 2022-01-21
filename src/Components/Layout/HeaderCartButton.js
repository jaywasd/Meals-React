import classes from "./HeaderCartButton.module.css";
import CartIcon from "../Cart/CartIcon";
import CartContext from "../../Store/cart-context";
import React, { useContext, useEffect, useState } from "react";

const HeaderCartButton = (props) => {
  const [animation, setAnimation] = useState(false);
  const ctx = useContext(CartContext);
  const { items } = ctx;
  const numberOfCartItems = items.reduce((currentValue, item) => {
    return currentValue + item.amount;
  }, 0);

  const onClickHandler = () => {
    props.onClick();
  };


  const flatItems = JSON.stringify(items);

  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setAnimation(true);
    const timer = setTimeout(() => {
      setAnimation(false);
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [flatItems, items.length]);

  const buttonClasses = `${classes.button} ${animation ? classes.bump : ""}`;

  return (
    <>
      <button className={buttonClasses} onClick={onClickHandler}>
        <span className={classes.icon}>
          <CartIcon />
        </span>
        <span>Your Cart</span>
        <span className={classes.badge}>{numberOfCartItems}</span>
      </button>
    </>
  );
};

export default HeaderCartButton;
