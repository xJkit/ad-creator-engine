import { gsap } from 'gsap';

export default class EntryAnimate {
  #target;
  constructor({ reverse = false } = {}) {
    this.windowHeight = window.parent.innerHeight;
    this.distance;
    this.reverse = reverse;
    this.init();
  }
  init() {
    // console.log(this.reverse);
    this.#target = document.querySelector('.entryAnimate__target');
    if (!this.#target) {
      throw new Error("doesn't find [entryAnimate__target]");
    }
    this.distance = this.h / 2 / this.#target.offsetHeight / 2;
    gsap.set(this.#target, {
      y: `${this.reverse ? '-' : ''}${this.distance}`,
      onComplete: () => {
        this.start();
      },
    });
  }
  start() {}
}
