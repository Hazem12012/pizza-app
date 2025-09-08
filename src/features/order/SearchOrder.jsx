import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
function SearchOrder() {
  const [quary, setQuary] = useState('');
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!quary) return;
    navigate(`/order/${quary}`);
    setQuary('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="w-28 rounded-full bg-yellow-100 px-4 py-2 duration-300 text-sm transition-all
         placeholder:text-stone-400 focus:w-72 focus:ring
         focus:ring-yellow-500 focus:outline-none sm:w-64 sm:focus:w-72 "
        placeholder="Search"
        value={quary}
        onChange={(e) => setQuary(e.target.value)}
      />
    </form>
  );
}

export default SearchOrder;
