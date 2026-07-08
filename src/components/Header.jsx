import { useContext } from 'react';
import logoImg from '../assets/logo.jpg';
import CartContext from '../store/CartContext';
import UserProgressContext from '../store/UserProgressContext';
import Button from './Button';

const Header = () => {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const totalCartItems = cartCtx.getCartItemCount();

  const handleShowCart = () => {
    userProgressCtx.showCart();
  };

  return (
    <header id='main-header'>
      <div id='title'>
        <img src={logoImg} alt='Restaurant Logo' />
        <h1>ARTHURITY FOODS</h1>
      </div>
      <nav>
        <Button textOnly onClick={handleShowCart}>
          Cart ({totalCartItems})
        </Button>
      </nav>
    </header>
  );
};

export default Header;
