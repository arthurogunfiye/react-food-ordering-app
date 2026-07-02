import { createContext, useReducer, useMemo, useCallback } from 'react';

const CartContext = createContext({
  items: [],
  addItem: item => {},
  removeItem: id => {},
  clearCart: () => {},
  getCartTotal: () => 0,
  getCartItemCount: () => 0
});

const initialCartState = {
  items: []
};

const CART_ACTIONS = {
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  CLEAR_CART: 'CLEAR_CART'
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case CART_ACTIONS.ADD_ITEM: {
      const existingItemIndex = state.items.findIndex(
        item => item.id === action.item.id
      );

      const updatedItems = [...state.items];

      if (existingItemIndex >= 0) {
        const existingItem = updatedItems[existingItemIndex];
        updatedItems[existingItemIndex] = {
          ...existingItem,
          quantity: existingItem.quantity + 1
        };
      } else {
        updatedItems.push({ ...action.item, quantity: 1 });
      }

      return {
        ...state,
        items: updatedItems
      };
    }

    case CART_ACTIONS.REMOVE_ITEM: {
      const existingItemIndex = state.items.findIndex(
        item => item.id === action.id
      );

      if (existingItemIndex < 0) {
        return state;
      }

      const updatedItems = [...state.items];
      const existingItem = updatedItems[existingItemIndex];

      if (existingItem.quantity === 1) {
        updatedItems.splice(existingItemIndex, 1);
      } else {
        updatedItems[existingItemIndex] = {
          ...existingItem,
          quantity: existingItem.quantity - 1
        };
      }

      return {
        ...state,
        items: updatedItems
      };
    }

    case CART_ACTIONS.CLEAR_CART:
      return initialCartState;

    default:
      return state;
  }
};

export const CartContextProvider = ({ children }) => {
  const [cart, dispatchCartAction] = useReducer(cartReducer, initialCartState);

  const addItem = useCallback(item => {
    dispatchCartAction({
      type: CART_ACTIONS.ADD_ITEM,
      item
    });
  }, []);

  const removeItem = useCallback(id => {
    dispatchCartAction({
      type: CART_ACTIONS.REMOVE_ITEM,
      id
    });
  }, []);

  const clearCart = useCallback(() => {
    dispatchCartAction({
      type: CART_ACTIONS.CLEAR_CART
    });
  }, []);

  const getCartItemCount = useCallback(() => {
    return cart.items.reduce((count, item) => count + item.quantity, 0);
  }, [cart.items]);

  const getCartTotal = useCallback(() => {
    return cart.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }, [cart.items]);

  const cartContext = useMemo(
    () => ({
      items: cart.items,
      addItem,
      removeItem,
      clearCart,
      getCartTotal,
      getCartItemCount
    }),
    [cart.items, addItem, removeItem, clearCart, getCartTotal, getCartItemCount]
  );

  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
};

export default CartContext;
