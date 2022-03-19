import { gsap } from 'gsap';

const parent = window.parent.document.documentElement;
export default class EntryAnimate {
  tl;
  constructor({ reverse = false, effect = 'template1' } = {}) {
    this.windowHeight = window.parent.innerHeight;
    this.windowWidth = window.parent.innerWidth;
    this.distance;
    this.reverse = reverse;
    this.chileNodes = document.querySelectorAll('.entryAnimate__container > *');
    this.effect = effect;

    if (this.effect === 'template2')
      document.querySelector('.entryAnimate__container').classList.add('entryAnimate__container--multiple');

    this.init();
  }
  init() {
    const newEl = Array.prototype.slice.call(this.chileNodes).map((i, k) => {
      const items = document.createElement('div');
      items.classList.add('entryAnimate__items');
      const cloneEl = i.cloneNode(true);
      items.append(cloneEl);
      return items;
    });

    document.querySelector('.entryAnimate__container').innerHTML = '';
    document.querySelector('.entryAnimate__container').append(...newEl);

    const referEl = document.querySelector('.entryAnimate__items').firstChild;
    // if (this.effect === 'template1') {
    //   this.distance = this.windowHeight / 2 + referEl.offsetHeight / 2;
    // } else {
    //   this.distance = this.windowWidth / 2 + referEl.offsetWidth / 2;
    //   document.querySelectorAll('.entryAnimate__items > *').forEach((i, k) => {
    //     gsap.set(i, {
    //       x: `${k % 2 === 0 ? (!this.reverse ? '-' : '') : !this.reverse ? '' : '-'}${this.distance}`,
    //       opacity: 1,
    //     });
    //   });
    // }
    switch (this.effect) {
      case 'template1':
        this.distance = this.windowHeight / 2 + referEl.offsetHeight / 2;
        break;
      case 'template2':
        this.distance = this.windowWidth / 2 + referEl.offsetWidth / 2;
        document.querySelectorAll('.entryAnimate__items > *').forEach((i, k) => {
          gsap.set(i, {
            x: `${k % 2 === 0 ? (!this.reverse ? '-' : '') : !this.reverse ? '' : '-'}${this.distance}`,
            opacity: 1,
          });
        });
        break;
      default:
        break;
    }
  }
  start() {
    // lock window scroll
    parent.style.height = '100%';
    parent.style.overflow = 'hidden';
    window.parent.document.body.style.overflow = 'hidden';
    window.parent.document.body.style.height = '100vh';

    this[this.effect]();
  }
  template1() {
    this.tl = gsap.timeline({ delay: 0.5 });
    const target = document.querySelector('.entryAnimate__items > img');
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
    document.querySelectorAll('.entryAnimate__items > *').forEach((i, k) => {
      gsap.to(i, { x: 0, ease: 'easeOut', duration: 0.8, delay: `${k === 2 ? '0.2 ' : '0'}` });
    });
    this.tl.to(document.querySelector('.entryAnimate__container'), {
      y: yDistance,
      opacity: 0,
      ease: 'easeIn',
      duration: 0.5,
      delay: 2.5,
      onComplete: () => {
        // entry animate end
        document.querySelector('.entryAnimate').remove();
      },
    });
  }
  template3() {
    this.tl = gsap.timeline({ delay: 0.5 });
    const target = document.querySelector('.entryAnimate__items > img');
    gsap.set(target, { opacity: 1 });
    gsap.fromTo(target, { scale: 0 }, { scale: 1, duration: 0.5 });
    this.tl
      .to(target, { scale: 1.3, ease: 'easeIn', duration: 0.5 }, '+=0.5')
      .to(target, { scale: 1, ease: 'easeOut', duration: 0.5 })
      .to(target, { scale: 1.3, ease: 'easeIn', duration: 0.5 })
      .to(target, { scale: 1, ease: 'easeOut', duration: 0.5 })
      .to(target, {
        scale: 5,
        opacity: 0,
        ease: 'easeIn',
        duration: 0.5,
        onComplete: () => {
          // entry animate end
          document.querySelector('.entryAnimate').remove();
        },
      });
  }
}
