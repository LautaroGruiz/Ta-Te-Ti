const Square = ({ children, isSelected, upDateBoard, index }) => {
  const className = `square ${isSelected ? `is-selected` : ""}`;
  const handleClick = () => {
    upDateBoard(index);
  };
  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  );
};
export default Square;
