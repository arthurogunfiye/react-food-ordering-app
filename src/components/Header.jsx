import logoImg from '../assets/logo.jpg';
import Button from './Button';

const Header = () => {
  return (
    <header id='main-header'>
      <div id='title'>
        <img src={logoImg} alt='Restaurant Logo' />
        <h1>ARTHURITY FOODS</h1>
      </div>
      <nav>
        <Button textOnly>Cart (0)</Button>
      </nav>
    </header>
  );
};

export default Header;
