import { useEffect, useState } from "react";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    fetchMeals();
  }, []);

  async function fetchMeals() {
    try {
      const response = await fetch(
        "https://react-wasd-default-rtdb.firebaseio.com/meals.json/"
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await response.json();
      setMeals(
        data.length
          ? data.map((meal) => {
              return (
                <MealItem
                  id={meal.id}
                  name={meal.name}
                  key={meal.id}
                  description={meal.description}
                  price={meal.price}
                />
              );
            })
          : []
      );
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }

  let content;
  if (isLoading) {
    content = <p>Fetching Meals..</p>;
  } else if (error) {
    content = <p>{error}</p>;
  } else {
    content = <ul>{meals}</ul>;
  }

  return (
    <section className={classes.meals}>
      <Card>{content}</Card>
    </section>
  );
};

export default AvailableMeals;
