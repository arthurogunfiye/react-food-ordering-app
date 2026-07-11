import { useContext } from 'react';
import CartContext from '../store/CartContext';
import UserProgressContext from '../store/UserProgressContext';
import currencyFormatter from '../utils/formatting';
import Button from './Button';
import Input from './Input';
import Modal from './Modal';
import { BASE_URL } from '../constants';

const Checkout = () => {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const cartTotal = cartCtx.getCartTotal();

  const handleCloseCheckout = () => {
    userProgressCtx.hideCheckout();
  };

  const handleSubmit = async event => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const customerData = Object.fromEntries(formData.entries());

    try {
      const response = await fetch(`${BASE_URL}/orders`, {
        method: 'POST',
        body: JSON.stringify({
          order: {
            items: cartCtx.items,
            customer: customerData
          }
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(
          `Unable to submit order: HTTP error! Status: ${response.status}`
        );
      }

      cartCtx.clearCart();
      userProgressCtx.hideCheckout();
    } catch (error) {
      console.error(`Unable to submit order: ${error}`);
    }
  };

  return (
    <Modal
      open={userProgressCtx.progress === 'checkout'}
      onClose={
        userProgressCtx.progress === 'checkout' ? handleCloseCheckout : null
      }
    >
      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>
        <Input label='Full Name' type='text' id='name' />
        <Input label='Email Address' type='email' id='email' />
        <Input label='Street' type='text' id='street' />
        <div className='control-row'>
          <Input label='Postal Code' type='text' id='postal-code' />
          <Input label='City' type='text' id='city' />
        </div>
        <p className='modal-actions'>
          <Button type='button' textOnly onClick={handleCloseCheckout}>
            Close
          </Button>
          <Button>Submit Order</Button>
        </p>
      </form>
    </Modal>
  );
};

export default Checkout;
