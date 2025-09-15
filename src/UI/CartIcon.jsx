import React from 'react';
import { TiShoppingCart } from 'react-icons/ti';

function CartIcon({ itemsNubmer }) {
  return (
    <div className="fixed bottom-25 right-10 w-fit cursor-pointer rounded-2xl bg-yellow-400 px-4 py-2 text-3xl ">
      <div className="absolute right-10 bottom-8 flex h-6 w-6 items-center justify-center rounded-full bg-black px-1 py-1">
        <span className="text-sm text-stone-100">{itemsNubmer || 0}</span>
      </div>
      <TiShoppingCart />
    </div>
  );
}

export default CartIcon;
