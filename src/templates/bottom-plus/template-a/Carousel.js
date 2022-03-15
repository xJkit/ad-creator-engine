import { gsap } from 'gsap';

export default class Carousel {
  constructor({ target } = {}) {
    this.target = target;
    this.startIndex = 0;
    this.length = this.target.length;
    this.init();
  }
  init() {
    const targetArr = Array.prototype.slice.call(this.target);
    targetArr[this.startIndex].setAttribute('data-position', 'active');
    targetArr[this.startIndex + 1 > this.length - 1 ? 0 : this.startIndex + 1].setAttribute('data-position', 'next');
    targetArr[this.startIndex - 1 < 0 ? this.length - 1 : this.startIndex - 1].setAttribute('data-position', 'prev');
  }
  start() {
    // custom effect
  }
}
