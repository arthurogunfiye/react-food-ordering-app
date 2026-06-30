const Meal = ({ name, price, description, img }) => {
  return (
    <div className='meal-item'>
      <img src={img} alt={name} />
      <h3>{name}</h3>
      <p className='meal-item-price'>£{price}</p>
      <p className='meal-item-description'>{description}</p>
      <div className='meal-item-actions'>
        <button type='button'>Add to Cart</button>
      </div>
    </div>
  );
};

export default Meal;
