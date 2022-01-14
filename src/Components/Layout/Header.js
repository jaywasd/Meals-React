import mealImage from "../../assets/meals.jpg";
import classes from "./Header.module.css";
import Cart from "../Cart/Cart";
import HeaderCartButton from "./HeaderCartButton";
import React, { useState } from "react";

const Header = (props) => {
  const [openCart, setOpenCart] = useState(false);
  const onCartOpenHandler = () => {
    setOpenCart(true);
  };

  const onCartCloseHandler = () => {
    setOpenCart(false);
  };
  return (
    <>
      <header className={classes.header}>
        <h1>ReactMeals</h1>
        <HeaderCartButton onClick={onCartOpenHandler} />
      </header>
      <div className={classes["main-image"]}>
        <img
          src={mealImage}
          alt="There should have been delecious meals displaying here :("
        />
      </div>
      {openCart && <Cart onClose={onCartCloseHandler} />}
    </>
  );
};

export default Header;
