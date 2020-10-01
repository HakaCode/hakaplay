import { useEffect } from "react";
import Card from "../Card";
import s from "./carousel.scss";
import data from "../../../home.json";
function Carousel() {
  return (
    <div className={s.wrapper}>
      {data.list.map((item, key) => (
        <div key={key}>
          <div className={s.head__wrapper}>
            <span>
              <a>{item.title}</a>
            </span>
          </div>
          <div className={`carousel ${s.carousel}`}>
            <div className={`cards ${s.cards}`}>
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Carousel;
