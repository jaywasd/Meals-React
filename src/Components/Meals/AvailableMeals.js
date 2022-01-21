import { useEffect, useState } from "react";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    fetchMeals();
  }, []);

  async function fetchMeals() {
    const response = await fetch(
      "https://react-wasd-default-rtdb.firebaseio.com/meals.json/"
    );
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
  }

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{meals}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
