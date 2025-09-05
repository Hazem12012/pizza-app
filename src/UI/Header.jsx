import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder.jsx";

function Header() {
  return (
    <header>
      <SearchOrder />
      <Link to={"/"}>Fast React Pizza</Link>
      <p>Hazem</p>
    </header>
  );
}

export default Header;
