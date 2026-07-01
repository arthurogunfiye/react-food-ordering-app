import { useEffect, useState } from 'react';
import Meal from './Meal';

const Meals = () => {
  const [fetchedMeals, setFetchedMeals] = useState([]);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await fetch('http://localhost:3000/meals');
        if (!response.ok) {
          throw new Error(`Failed to fetch meals: (HTTP ${response.status})`);
        }
        const meals = await response.json();
        setFetchedMeals(meals);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMeals();
  }, []);

  return (
    <ul id='meals'>
      {fetchedMeals.map(meal => {
        return <Meal key={meal.id} meal={meal} />;
      })}
    </ul>
  );
};

export default Meals;
