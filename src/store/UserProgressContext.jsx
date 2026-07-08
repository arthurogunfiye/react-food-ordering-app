import { createContext, useState } from 'react';

const UserProgressContext = createContext({
  progress: '', // cart or checkout
  showCart: () => {},
  hideCart: () => {},
  showCheckout: () => {},
  hideCheckout: () => {}
});

const userProgressReducer = (state, action) => {};

export const UserProgressContextProvider = ({ children }) => {
  const [userProgress, setUserProgress] = useState('');

  function showCart() {
    setUserProgress('cart');
  }

  function hideCart() {
    setUserProgress('');
  }

  function showCheckout() {
    setUserProgress('checkout');
  }

  function hideCheckout() {
    setUserProgress('');
  }

  const userProgressCtx = {
    progress: userProgress,
    showCart,
    hideCart,
    showCheckout,
    hideCheckout
  };

  return (
    <UserProgressContext.Provider value={userProgressCtx}>
      {children}
    </UserProgressContext.Provider>
  );
};

export default UserProgressContext;
