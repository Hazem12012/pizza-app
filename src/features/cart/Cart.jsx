import LinkButton from '../../UI/LinkButton.jsx';
import { Link } from 'react-router-dom';
import Button from './../../UI/Button';
import CartItem from './CartItem.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, getTotalCart } from './cartSlice.js';
import EmptyCart from './EmptyCart.jsx';

function Cart() {
  const cart = useSelector(getTotalCart);
  const dispatch = useDispatch();
  const username = useSelector((state) => state.user.username);

  if(!cart.length) return <EmptyCart/>

  return (
    <div className="px-4 py-3">
      <LinkButton
        to="/menu"
        className="text-blue-500 duration-300 hover:text-blue-900 hover:underline"
      >
        &larr; Back to menu
      </LinkButton>

      <h2 className="mt-7 text-xl font-semibold">Your cart , {username}</h2>
      <ul className="mt-3 divide-y divide-stone-200 border-b border-stone-200">
        {cart.map((item) => {
          return <CartItem item={item} key={item.pizzaId} />;
        })}
      </ul>
      {cart.length !== 0 && (
        <div className="mt-6 space-x-2">
          <Button to="/order/new" type="primary">
            Order pizzas
          </Button>
          <Button type="secondary" onClick={() => dispatch(clearCart())}>
            Clear Cart
          </Button>
        </div>
      )}
    </div>
  );
}

export default Cart;
