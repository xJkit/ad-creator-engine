import { gsap } from 'gsap';

const parent = window.parent.document.documentElement;
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
    this.distance = this.windowHeight / 2 + this.#target.offsetHeight / 2;

    gsap.set(this.#target, {
      y: `${!this.reverse ? '-' : ''}${this.distance}`,
    });
  }
  start() {
    // lock window scroll
    parent.style.height = '100%';
    parent.style.overflow = 'hidden';
    window.parent.document.body.style.overflow = 'hidden';
    window.parent.document.body.style.height = '100vh';

    // animate
    // if does't set delay, animate will start with onFullScreen effect together
    const tl = gsap.timeline({ delay: 0.5 });
    tl.to(this.#target, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: 'easeOut',
    }).to(
      this.#target,
      {
        y: `${this.reverse ? '-' : ''}${this.distance}`,
        opacity: 0,
        duration: 0.8,
        ease: 'easeIn',
        onComplete: () => {
          // entry animate end
          document.querySelector('.entryAnimate').remove();
        },
      },
      '+=1.7',
    );
  }
}
