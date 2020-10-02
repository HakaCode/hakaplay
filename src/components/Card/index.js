import React from "react";
import s from "./Card.scss";
const Card = React.forwardRef(({ calc_width }, ref) => {
  return (
    <div className={`card ${s.card}`} style={{ width: `${calc_width}px` }}>
      <img src="https://images.alphacoders.com/108/thumb-1920-1086000.png" />
    </div>
  );
});

export default Card;
