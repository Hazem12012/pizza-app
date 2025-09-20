import Header from './Header';
import CartOverview from '../features/cart/CartOverview';
import { Outlet, useNavigation } from 'react-router-dom';
import Loader from './Loader.jsx';

function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';

  return (
    <div className="background-home layout grid h-screen grid-rows-[auto_1fr_auto] bg-stone-100">
      {isLoading && <Loader />}

      <Header />
      <div className="my-5 overflow-scroll">
        <main className="mx-auto max-w-3xl">
          <Outlet />
        </main>
      </div>
      <CartOverview />
    </div>
  );
}

export default AppLayout;
