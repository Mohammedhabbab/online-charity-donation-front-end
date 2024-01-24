// CartContext.js
import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartQuantity, setCartQuantity] = useState(0);

    const updateCartQuantity = (quantity) => {
        setCartQuantity(quantity);
    };

    return (
        <CartContext.Provider value={{ cartQuantity, updateCartQuantity }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCartContext = () => {
    return useContext(CartContext);
};
