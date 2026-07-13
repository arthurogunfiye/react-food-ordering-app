import { useContext } from 'react';
import { BASE_URL } from '../constants';
import useHttp from '../hooks/useHttp';
import CartContext from '../store/CartContext';
import UserProgressContext from '../store/UserProgressContext';
import currencyFormatter from '../utils/formatting';
import Button from './Button';
import Error from './Error';
import Input from './Input';
import Modal from './Modal';

const requestConfig = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  }
};

const Checkout = () => {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const {
    data,
    isLoading: isSendingOrderRequest,
    error,
    clearData,
    sendRequest
  } = useHttp(`${BASE_URL}/orders`, requestConfig);

  const cartTotal = cartCtx.getCartTotal();

  const handleCloseCheckout = () => {
    userProgressCtx.hideCheckout();
    clearData();
  };

  const handleFinishTransaction = () => {
    userProgressCtx.hideCheckout();
    cartCtx.clearCart();
    clearData();
  };

  const handleSubmit = event => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const customerData = Object.fromEntries(formData.entries());

    sendRequest(
      JSON.stringify({
        order: {
          items: cartCtx.items,
          customer: customerData
        }
      })
    );
  };

  let actions = (
    <>
      <Button type='button' textOnly onClick={handleCloseCheckout()}>
        Close
      </Button>
      <Button>Submit Order</Button>
    </>
  );

  if (isSendingOrderRequest) {
    actions = <span>Sending order data...</span>;
  }

  if (data && !error) {
    return (
      <Modal
        open={userProgressCtx.progress === 'checkout'}
        onClose={handleFinishTransaction}
      >
        <h2>Success!</h2>
        <p>Your order was submitted successfully.</p>
        <p>
          An order confirmation email will be sent within the next few minutes.
        </p>
        <p className='modal-actions'>
          <Button onClick={handleFinishTransaction}>Okay</Button>
        </p>
      </Modal>
    );
  }

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
        {error && <Error title='Failed to submit order' message={error} />}
        <p className='modal-actions'>{actions}</p>
      </form>
    </Modal>
  );
};

export default Checkout;
