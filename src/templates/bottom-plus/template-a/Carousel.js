import { gsap } from 'gsap';
export default class Carousel {
  xDown;
  xDiff;
  constructor({ target } = {}) {
    this.target = target;
    this.startIndex = 0;
    this.length = this.target.length;
    this.targetArr = Array.prototype.slice.call(this.target);
    this.xDown = null;
    this.xDiff = 0;
    this.touchDownHandler = this.touchDownHandler.bind(this);
    this.touchEndHandler = this.touchEndHandler.bind(this);
    this.set();

    document.querySelector('.expand__wrapper').addEventListener('touchstart', this.touchDownHandler);
    document.querySelector('.expand__wrapper').addEventListener('touchend', this.touchEndHandler);
  }
  set() {
    this.targetArr[this.startIndex].setAttribute('data-position', 'active');
    this.targetArr[this.startIndex + 1 > this.length - 1 ? 0 : this.startIndex + 1].setAttribute(
      'data-position',
      'next',
    );
    this.targetArr[this.startIndex - 1 < 0 ? this.length - 1 : this.startIndex - 1].setAttribute(
      'data-position',
      'prev',
    );
  }

  touchDownHandler(e) {
    this.xDown = e.touches[0].clientX;
  }
  touchEndHandler(e) {
    this.xDiff = e.changedTouches[0].clientX - this.xDown;
    if (this.xDiff > 0) {
      // 往左滑 --
      this.startIndex--;
      this.startIndex = this.startIndex < 0 ? this.length - 1 : this.startIndex;
    } else {
      // 往右滑 ++
      this.startIndex++;
      this.startIndex = this.startIndex === this.length ? 0 : this.startIndex;
    }

    this.set();
  }
}
