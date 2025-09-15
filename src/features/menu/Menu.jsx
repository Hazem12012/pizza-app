import { useLoaderData } from 'react-router-dom';
import { getMenu } from '../../services/apiRestaurant.js';
import MenuItem from './MenuItem.jsx';
import CartIcon from '../../UI/CartIcon.jsx';
import { useSelector } from 'react-redux';
import { getTotalCartQuantity } from '../cart/cartSlice.js';
function Menu() {
  const totalCartQuantity = useSelector(getTotalCartQuantity);

  const menu = useLoaderData();
  return (
    <>
      <CartIcon itemsNubmer={totalCartQuantity} />
      <ul className="divide-y divide-stone-200 px-2">
        {menu.map((pizza) => {
          return <MenuItem pizza={pizza} key={pizza.id} />;
        })}
      </ul>
    </>
  );
}
export async function loader() {
  const menu = await getMenu();
  return menu;
}
export default Menu;
