const Button = ({ handleTask, children }) => {
  return (
    <button onClick={() => handleTask()}>
     {children}
    </button>
  );
};

export default Button;
