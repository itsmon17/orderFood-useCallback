import { createContext, useCallback, useEffect, useReducer } from "react";
import { fetchRequest } from "../lib/fetchAPI";

export const cartContext = createContext({
  items: [],
  totalAmount: 0,
});

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    state = action.payload;
  }

  if (action.type === "INCREMENT") {
    state = action.payload;
  }

  if (action.type === "DECREMENT") {
    state = action.payload;
  }
  return state;
};

export const CartProvider = ({ children }) => {
  const [cartState, dispatch] = useReducer(cartReducer, []);

  const addItemToCartHandler = useCallback(async (id, amount) => {
    console.log("addItemToCartHandler");
    try {
      const response = await fetchRequest(`/foods/${id}/addToBasket`, {
        method: "POST",
        body: { amount },
      });
      dispatch({ type: "ADD", payload: response.items });
    } catch (error) {
      console.error(error);
    }
  });

  const getBasketHandler = useCallback(async () => {
    console.log("getBasketHandler");
    try {
      const response = await fetchRequest("/basket");
      dispatch({ type: "ADD", payload: response.items });
    } catch (error) {
      new Error(error);
    }
  });

  useEffect(() => {
    getBasketHandler();
  }, []);

  const incrementAmountHandler = useCallback(async (id, amount) => {
    console.log(amount, "incrementAmount");
    try {
      const response = await fetchRequest(`/basketItem/${id}/update`, {
        method: "PUT",
        body: { amount: amount + 1 },
      });
      dispatch({ type: "INCREMENT", payload: response.items });
      getBasketHandler();
    } catch (error) {
      console.error(error);
    }
  });

  const decrementAmountHandler = useCallback(async (id, amount) => {
    console.log(amount, "decrementAmountHandler");

    try {
      if (amount !== 1) {
        const response = await fetchRequest(`/basketItem/${id}/update`, {
          method: "PUT",
          body: { amount: amount - 1 },
        });
        dispatch({ type: "DECREMENT", payload: response.items });
      } else {
        const response = await fetchRequest(`/basketItem/${id}/delete`, {
          method: "DELETE",
        });
        dispatch({ type: "DECREMENT", payload: response.items });
      }
      getBasketHandler();
    } catch (error) {
      console.error(error);
    }
  });

  const orderAmount = cartState?.reduce(
    (prev, current) => prev + current.amount,
    0
  );
  const getTotalAmountHandler = useCallback(
    cartState?.reduce((sum, { price, amount }) => sum + amount * price, 0)
  );

  const cartValue = {
    cartItems: cartState,
    totalAmount: orderAmount,
    addItem: addItemToCartHandler,
    incrementAmountHandler,
    decrementAmountHandler,
    getTotalAmountHandler,
  };

  return (
    <cartContext.Provider value={cartValue}>{children}</cartContext.Provider>
  );
};
