import { Link } from 'react-router-dom';

function Button({ children, disabled, to, type, onClick }) {
  const pase =
    'inline-block text-sm cursor-pointer rounded-full bg-yellow-400  font-semibold tracking-wide text-stone-800 uppercase transition-colors duration-300 hover:bg-yellow-300 hover:text-stone-500 focus:ring focus:ring-yellow-300 focus:ring-offset-2 focus:outline-none focus:bg-yellow-300 ';
  const styles = {
    primary: pase + ' md:px-6 md:py-4 px-4 py-3',
    small: pase + ' py-2  px-4 md:px-5 md:py-2.5 text-xs',
    secondary:
      'md:px-6 md:py-3.5 text-sm px-4 py-2.5 inline-block cursor-pointer rounded-full border-2 border-stone-300 font-semibold tracking-wide text-stone-400 uppercase transition-colors duration-300 hover:bg-stone-300 hover:text-stone-800 focus:text-stone-800 focus:ring focus:ring-stone-200 focus:ring-offset-2 focus:outline-none focus:bg-stone-300',
    round: pase + ' py-1  px-2.5 md:px-3.5 md:py-2 text-sm',
  };

  if (to) {
    return (
      <Link className={styles[type]} to={to}>
        {children}
      </Link>
    );
  }
  if (onClick) {
    return (
      <button
        disabled={disabled || false}
        className={styles[type]}
        onClick={onClick}
      >
        {children}
      </button>
    );
  }
  return (
    <button
      disabled={disabled || false}
      className={styles[type]}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
