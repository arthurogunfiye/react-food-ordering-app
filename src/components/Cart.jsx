import { useContext } from 'react';
import CartContext from '../store/CartContext';
import UserProgressContext from '../store/UserProgressContext';
import currencyFormatter from '../utils/formatting';
import Button from './Button';
import CartItem from './CartItem';
import Modal from './Modal';

const Cart = () => {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const cartTotal = cartCtx.getCartTotal();

  const handleCloseCart = () => {
    userProgressCtx.hideCart();
  };

  return (
    <Modal className='cart' open={userProgressCtx.progress === 'cart'}>
      <h2>Your Cart</h2>
      <ul>
        {cartCtx.items.map(item => {
          const { id, name, quantity, price } = item;
          return (
            <CartItem
              key={id}
              name={name}
              quantity={quantity}
              price={price}
              onIncrease={() => cartCtx.addItem(item)}
              onDecrease={() => cartCtx.removeItem(id)}
            />
          );
        })}
      </ul>
      <p className='cart-total'>Total: {currencyFormatter.format(cartTotal)}</p>
      <p className='modal-actions'>
        <Button textOnly onClick={handleCloseCart}>
          Close
        </Button>
        <Button onClick={handleCloseCart}>Go to Checkout</Button>
      </p>
    </Modal>
  );
};

export default Cart;
