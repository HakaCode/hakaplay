import s from "./Card.scss";
function Card() {
  return (
    <div className={`card ${s.card}`}>
      <img src="https://images.alphacoders.com/108/thumb-1920-1086000.png" />
    </div>
  );
}

export default Card;
