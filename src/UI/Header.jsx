import { Link } from 'react-router-dom';
import SearchOrder from '../features/order/SearchOrder.jsx';
import UserName from '../features/user/userName.jsx';

function Header() {
  return (
    <header className="text-black-900 flex items-center justify-between border-b border-stone-200 bg-yellow-500 p-2 px-4 py-3 text-center uppercase sm:px-6">
      <Link to={'/'} className="tracking-[3px]">
        Fast React Pizza
      </Link>
      <SearchOrder />

      <UserName />
    </header>
  );
}

export default Header;
