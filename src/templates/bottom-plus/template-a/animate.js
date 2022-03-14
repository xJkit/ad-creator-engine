import gsap from 'gsap';
import EntryAnimate from 'common/EntryAnimate';

export default function animate() {
  // 1. entry animtion
  new EntryAnimate();
  // 2. slot animation
  // gsap.to('.logo', {
  //   rotation: '+=360',
  //   duration: 5,
  //   repeat: -1,
  //   ease: 'linear',
  // });
}
