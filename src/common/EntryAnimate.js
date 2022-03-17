import { gsap } from 'gsap';

const parent = window.parent.document.documentElement;
export default class EntryAnimate {
  tl;
  constructor({ reverse = false, effect = 'template1' } = {}) {
    this.windowHeight = window.parent.innerHeight;
    this.windowWidth = window.parent.innerWidth;
    this.distance;
    this.reverse = reverse;
    // 0316
    this.chileNodes = document.querySelectorAll('.entryAnimate__container > *');
    this.effect = effect;

    if (this.effect === 'template2')
      document.querySelector('.entryAnimate__container').classList.add('entryAnimate__container--multiple');

    this.init();
  }
  init() {
    // this.#target = document.querySelector('.entryAnimate__target');
    // if (!this.#target) {
    //   throw new Error("doesn't find [entryAnimate__target]");
    // }
    // this.distance = this.windowHeight / 2 + this.#target.offsetHeight / 2;

    // gsap.set(this.#target, {
    //   y: `${!this.reverse ? '-' : ''}${this.distance}`,
    // });

    // 0316
    const newEl = Array.prototype.slice.call(this.chileNodes).map((i, k) => {
      const items = document.createElement('div');
      // items.classList.add(
      //   this.template === 'template1' ? 'entryAnimate__items' : 'entryAnimate__items',
      //   'entryAnimate__items--multiple',
      // );
      items.classList.add('entryAnimate__items');
      const cloneEl = i.cloneNode(true);
      items.append(cloneEl);
      return items;
    });

    document.querySelector('.entryAnimate__container').innerHTML = '';
    document.querySelector('.entryAnimate__container').append(...newEl);

    const referEl = document.querySelector('.entryAnimate__items').firstChild;
    if (this.effect === 'template1') {
      this.distance = this.windowHeight / 2 + referEl.offsetHeight / 2;
    } else {
      this.distance = this.windowWidth / 2 + referEl.offsetWidth / 2;
      document.querySelectorAll('.entryAnimate__items > *').forEach((i, k) => {
        // console.log(`${k % 2 === 1 && '-'}${this.distance}`);
        gsap.set(i, { x: `${k % 2 === 0 ? '-' : ''}${this.distance}`, opacity: 1 });
      });
    }
    // this.start();
    // for (let i = 0; i < document.querySelectorAll('.entryAnimate__items').length; i++) {
    //   const el = document.querySelectorAll('.entryAnimate__items')[i];
    //   gsap.set(el, { y: `${!this.reverse ? '-' : ''}${this.distance}` });
    // }
  }
  start() {
    // lock window scroll
    parent.style.height = '100%';
    parent.style.overflow = 'hidden';
    window.parent.document.body.style.overflow = 'hidden';
    window.parent.document.body.style.height = '100vh';

    switch (this.effect) {
      case 'template1':
        this.template1();
        break;
      case 'template2':
        this.template2();
        break;
      default:
        break;
    }

    // animate
    // if does't set delay, animate will start with onFullScreen effect together
    // const tl = gsap.timeline({ delay: 0.5 });
    // tl.to(this.#target, {
    //   y: 0,
    //   opacity: 1,
    //   duration: 0.8,
    //   ease: 'easeOut',
    // });
    // .to(
    //   this.#target,
    //   {
    //     y: `${this.reverse ? '-' : ''}${this.distance}`,
    //     opacity: 0,
    //     duration: 0.8,
    //     ease: 'easeIn',
    //     onComplete: () => {
    //       // entry animate end
    //       document.querySelector('.entryAnimate').remove();
    //     },
    //   },
    //   '+=1.7',
    // );
  }
  template1() {
    this.tl = gsap.timeline({ delay: 0.5 });
    const target = document.querySelector('.entryAnimate__items > img');
    // gsap.set(target, {
    //   y: `${!this.reverse ? '-' : ''}${this.distance}`,
    // });
    this.tl
      .fromTo(
        target,
        {
          y: `${!this.reverse ? '-' : ''}${this.distance}`,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'easeOut',
        },
      )
      .to(
        target,
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
  template2() {
    const yDistance =
      document.querySelector('.entryAnimate__container').offsetTop +
      document.querySelector('.entryAnimate__container').offsetHeight;
    this.tl = gsap.timeline({ delay: 0 });
    document.querySelectorAll('.entryAnimate__items > *').forEach((i, k) => {});
    document.querySelectorAll('.entryAnimate__items > *').forEach((i, k) => {
      gsap.to(i, { x: 0, ease: 'easeOut', duration: 0.8, delay: `${k === 2 ? '0.2 ' : '0'}` });
    });
    this.tl.to(document.querySelector('.entryAnimate__container'), {
      y: yDistance,
      opacity: 0,
      ease: 'easeIn',
      duration: 0.5,
      delay: 2.5,
    });
  }
}
