import { useContext } from 'react';
import logoImg from '../assets/logo.jpg';
import CartContext from '../store/CartContext';
import Button from './Button';

const Header = () => {
  const cartCtx = useContext(CartContext);

  const totalCartItems = cartCtx.getCartItemCount();

  return (
    <header id='main-header'>
      <div id='title'>
        <img src={logoImg} alt='Restaurant Logo' />
        <h1>ARTHURITY FOODS</h1>
      </div>
      <nav>
        <Button textOnly>Cart ({totalCartItems})</Button>
      </nav>
    </header>
  );
};

export default Header;
