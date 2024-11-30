import React from 'react';
const Button = ({ click }) => {
  return (
    <button className="button" onClick={click}>
      Load more
    </button>
  );
};

export default Button;
