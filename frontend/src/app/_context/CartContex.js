'use client'
import React, { createContext, useState } from 'react';
export const CartContext = createContext(null);

export function CartProvider({children}){
    const [cart,setCart] = useState([]);
    return(
        <CartContext.Provider value={{cart,setCart}}>
            {children}
        </CartContext.Provider>
    )
}

