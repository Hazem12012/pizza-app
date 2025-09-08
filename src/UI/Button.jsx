function Button({ children, disabled }) {
  return (
    <button
      disabled={disabled || false}
      className="inline-block cursor-pointer rounded-full bg-yellow-400 px-4 py-3 font-semibold tracking-wide text-stone-800 uppercase transition-colors duration-300 hover:bg-yellow-300 hover:text-stone-500 focus:ring focus:ring-yellow-300 focus:ring-offset-2 focus:outline-none sm:px-6 sm:py-4"
    >
      {children}
    </button>
  );
}

export default Button;
