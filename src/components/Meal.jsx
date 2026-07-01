import currencyFormatter from '../utils/formatting';
import Button from './Button';

const Meal = ({ name, price, description, img }) => {
  return (
    <li className='meal-item'>
      <article>
        <img src={img} alt={name} />
        <div>
          <h3>{name}</h3>
          <p className='meal-item-price'>{currencyFormatter.format(price)}</p>
          <p className='meal-item-description'>{description}</p>
        </div>
        <p className='meal-item-actions'>
          <Button>Add to Cart</Button>
        </p>
      </article>
    </li>
  );
};

export default Meal;
