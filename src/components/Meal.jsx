const Meal = ({ name, price, description, img }) => {
  return (
    <div className='meal-item'>
      <img src={img} alt={name} />
      <h3>{name}</h3>
      <p className='meal-item-price'>£{price}</p>
      <p className='meal-item-description'>{description}</p>
      <button>Add to Cart</button>
    </div>
  );
};

export default Meal;
