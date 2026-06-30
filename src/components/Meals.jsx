import { useEffect, useState } from 'react';
import Meal from './Meal';

const Meals = () => {
  const [fetchedMeals, setFetchedMeals] = useState([]);
  const baseUrl = 'http://localhost:3000';

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await fetch(`${baseUrl}/meals`);
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
  }, [baseUrl]);

  return (
    <ul id='meals'>
      {fetchedMeals.map(meal => {
        const { id, name, price, description, image } = meal;
        return (
          <Meal
            key={id}
            name={name}
            price={price}
            description={description}
            img={`${baseUrl}/${image}`}
          />
        );
      })}
    </ul>
  );
};

export default Meals;
