import Meal from './Meal';
import { BASE_URL } from '../constants';
import useHttp from '../hooks/useHttp';
import Error from './Error';

const requestConfig = { method: 'GET' };

const Meals = () => {
  const {
    data: fetchedMeals,
    error,
    isLoading
  } = useHttp(`${BASE_URL}/meals`, requestConfig, []);

  if (isLoading) return <p className='center'>Fetching meals...</p>;

  if (error) return <Error title='Failed to fetch meals' message={error} />;

  return (
    <ul id='meals'>
      {fetchedMeals.map(meal => {
        return <Meal key={meal.id} meal={meal} />;
      })}
    </ul>
  );
};

export default Meals;
