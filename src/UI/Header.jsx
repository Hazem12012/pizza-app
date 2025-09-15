import { Link } from 'react-router-dom';
import SearchOrder from '../features/order/SearchOrder.jsx';
import UserName from '../features/user/UserName.jsx';

function Header() {
  return (
    <header
      style={{ fontFamily: 'Roboto' }}
      className="flex items-center justify-between border-b
       border-stone-200 bg-yellow-500 p-2 px-4 py-3 
       text-center text-black uppercase sm:px-6"
    >
      <Link to={'/'} className="tracking-[3px]">
        Fast React Pizza
      </Link>
      <SearchOrder />

      <UserName />
    </header>
  );
}

export default Header;
