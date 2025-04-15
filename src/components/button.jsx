const Button = ({ handleTask, children, className }) => {
  return (
    <button className={className} onClick={handleTask}>
     {children}
    </button>
  );
};

export default Button;
