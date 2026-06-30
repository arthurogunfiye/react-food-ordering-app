import { useEffect, useState } from 'react';
import Meal from './Meal';

const Meals = () => {
  const [fetchedMeals, setFetchedMeals] = useState([]);

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch('http://localhost:3000/meals');
      if (!response.ok) return;
      const meals = await response.json();
      setFetchedMeals(meals);
    };

    fetchMeals();
  }, []);

  return (
    <div id='meals'>
      {fetchedMeals.map(meal => {
        const { id, name, price, description, image } = meal;
        return (
          <Meal
            key={meal.id}
            name={name}
            price={price}
            description={description}
            img={`http://localhost:3000/${image}`}
          />
        );
      })}
    </div>
  );
};

export default Meals;
