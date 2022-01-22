import React, { useRef, useState } from "react";
import classes from "./Checkout.module.css";

const isEmpty = (data) => data.trim().length === 0;
const isFiveChar = (data) => data.trim().length === 5;

const Checkout = (props) => {
  const [formsInputValidity, setFormsInputValidity] = useState({
    name: true,
    street: true,
    city: true,
    postal: true,
  });

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalInputRef = useRef();
  const cityInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const enterdName = nameInputRef.current.value;
    const enterdStreet = streetInputRef.current.value;
    const enterdPostal = postalInputRef.current.value;
    const enterdCity = cityInputRef.current.value;

    setFormsInputValidity({
      name: enterdName,
      street: enterdStreet,
      city: enterdCity,
      postal: enterdPostal,
    });

    const isNameValid = !isEmpty(enterdName);
    const isStreetValid = !isEmpty(enterdStreet);
    const isPostalValid = isFiveChar(enterdPostal);
    const isCityValid = !isEmpty(enterdCity);

    const formIsValid =
      isNameValid && isCityValid && isPostalValid && isStreetValid;

    if (!formIsValid) {
      return;
    }

    props.onConfirm({
      name: enterdName,
      street: enterdStreet,
      city: enterdCity,
      postalCode: enterdPostal,
    });

    nameInputRef.current.value = "";
    cityInputRef.current.value = "";
    postalInputRef.current.value = "";
    streetInputRef.current.value = "";
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div
        className={`${classes.control} ${
          formsInputValidity.name ? "" : classes.invalid
        }`}
      >
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formsInputValidity.name && <p>Please enter a valid Name!</p>}
      </div>
      <div
        className={`${classes.control} ${
          formsInputValidity.street ? "" : classes.invalid
        }`}
      >
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!formsInputValidity.street && <p>Please enter a valid Street name!</p>}
      </div>
      <div
        className={`${classes.control} ${
          formsInputValidity.postal ? "" : classes.invalid
        }`}
      >
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalInputRef} />
        {!formsInputValidity.postal && <p>Please enter a valid Postal code!</p>}
      </div>
      <div
        className={`${classes.control} ${
          formsInputValidity.city ? "" : classes.invalid
        }`}
      >
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formsInputValidity.city && <p>Please enter a valid City name!</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;