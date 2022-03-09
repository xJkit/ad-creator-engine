import gsap from 'gsap';

export default function animate() {
  // 1. entry animtion
  // 2. slot animation
  gsap.to('.logo', {
    rotation: '+=360',
    duration: 5,
    repeat: -1,
    ease: 'linear',
  });
}
