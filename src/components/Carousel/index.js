import React, { useEffect, useRef, useState } from "react";
import smoothscroll from "smoothscroll-polyfill";
import Card from "../Card";
import s from "./carousel.scss";
class Carousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disableLeftButton: true,
      calc_width: 0,
    };
    this.results = props.results;
    this.title = props.title;
    this.elementWidth = 0;
    this.carouselWidth = 0;
    this.visibleWidth = 0;
    this.maximumPosition = 0;
    this.unusableVisibleWidth = 0;
    this.disableRightButton = false;
    this.calc_height = 0;
    this.calc_width = 0;
  }
  componentDidMount() {
    const count = this.results ? this.results.length + 1 : this.results.length;
    this.calculateState(count);
    this.cardsResize();
    smoothscroll.polyfill();
    window.addEventListener("resize", this.resizeEvent);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.resizeEvent);
  }
  calculateState(numberOfItems) {
    let unusableVisibleWidth = 72;
    const elementWidth = this.refs.carouselElement.firstChild.getBoundingClientRect()
      .width;
    const carouselWidth = numberOfItems * elementWidth;
    const maximumPosition = this.refs.carouselElement.scrollWidth;
    if (window.innerWidth >= 1200) {
      unusableVisibleWidth = 92;
    }
    const visibleWidth =
      this.refs.carouselElement.offsetWidth - unusableVisibleWidth;
    this.unusableVisibleWidth = unusableVisibleWidth;
    this.elementWidth = elementWidth;
    this.carouselWidth = carouselWidth;
    this.visibleWidth = visibleWidth;
    this.maximumPosition = maximumPosition;
    this.setState({ disableLeftButton: !this.refs.carouselElement.scrollLeft });
    this.disableRightButton = visibleWidth >= carouselWidth;
  }
  moveTo(width) {
    this.refs.carouselElement.scrollTo({
      left: width,
      behavior: "smooth",
    });
  }
  moveToClickEvent(direction) {
    const invisible =
      this.refs.carouselElement.scrollLeft +
      (direction === "left" ? -this.visibleWidth + 1 : this.visibleWidth);
    const remainder = invisible - (invisible % this.elementWidth);
    this.moveTo(remainder);
  }
  scrollEvent() {
    const scrollLeft = this.refs.carouselElement.scrollLeft;
    const end = this.maximumPosition - this.visibleWidth - this.elementWidth;
    this.setState({ disableLeftButton: 5 > scrollLeft });
    this.disableRightButton = scrollLeft > end;
  }
  cardsResize() {
    let browser = window.innerWidth;
    let calc_width = 0;
    let calc_height = 0;
    if (browser > 1440) {
      calc_width = (browser - (browser / 100) * 10) / 5 - 20;
      calc_height = (browser / 100) * 12.5;
    }
    this.setState({ calc_width: calc_width });
  }
  render() {
    return (
      <div>
        <div className={s.head__wrapper}>
          <span>
            <a>{this.title}</a>
          </span>
          <div className={s.carousel_nav}>
            <button
              className={s.carousel__prev}
              onClick={() => this.moveToClickEvent("left")}
            >
              &lsaquo;
            </button>
            <button
              className={s.carousel__next}
              onClick={() => this.moveToClickEvent("right")}
            >
              &rsaquo;
            </button>
          </div>
        </div>
        <div className={`carousel ${s.carousel}`}>
          <div
            className={`cards ${s.cards}`}
            onScroll={() => this.scrollEvent()}
            ref="carouselElement"
          >
            {this.results.map((item, index) => (
              <Card calc_width={this.state.calc_width || 260} key={index} />
            ))}
          </div>
        </div>
      </div>
    );
  }
}
export default Carousel;
