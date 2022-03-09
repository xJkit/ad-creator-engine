import gsap from 'gsap';

export default function animate() {
  gsap.to('.logo', {
    rotation: '+=360',
    duration: 5,
    repeat: -1,
    ease: 'linear',
  });
}
