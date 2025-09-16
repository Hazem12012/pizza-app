import { Link } from 'react-router-dom';
import { getTotalCartPrice, getTotalCartQuantity } from './cartSlice';
import { useSelector } from 'react-redux';
import { formatCurrency } from '../../utilities/helpers';
function CartOverview() {
  const totalCartQuantity = useSelector(getTotalCartQuantity);
  const totalCartPrice = useSelector(getTotalCartPrice);

  if (!totalCartQuantity) return null;
  return (
    <div className="text-s flex items-center justify-between bg-stone-800 px-4 py-4 text-stone-200 uppercase sm:px-6 md:text-base">
      <p className="flex items-center justify-around gap-10">
        <span>{totalCartQuantity} pizzas </span>
        <span>{formatCurrency(totalCartPrice)}</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
