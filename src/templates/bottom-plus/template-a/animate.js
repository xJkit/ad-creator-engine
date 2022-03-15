import { gsap } from 'gsap';
import EntryAnimate from 'common/EntryAnimate';

const triggerDistance = 1000;

export default function animate({ renderHeight: { fullScreen, normalScreen } }) {
  let isFirst = true;
  const tl = gsap.timeline();
  const entryAnimate = new EntryAnimate();
  let currentIndex = 0;

  return function (documentScrollTop, documentScrollHeight) {
    currentIndex = getCurrentIndex(documentScrollTop);
    console.log(currentIndex);
    if (isFirst && documentScrollTop <= 20) {
      // 1. entry animtion
      isFirst = false;
      fullScreen();
      entryAnimate.start();
      // slot animation delay 3.5s
      prepareSlot(tl, normalScreen);
    } else {
      // 2. slot animation
      scrollHandle(tl, currentIndex);
    }
  };
}

function prepareSlot(tl, normalScreen) {
  tl.addLabel('slot', '+=3');
  tl.to(
    '.slot',
    {
      y: 0,
      duration: 0.5,
      onComplete: function () {
        normalScreen();
      },
    },
    'slot',
  )
    .to(
      '.slot__banner',
      {
        scale: 1,
        duration: 0.5,
        onComplete: function () {
          window.parent.document.documentElement.removeAttribute('style');
        },
      },
      'slot+=0.05',
    )
    .to(
      '.slot__video',
      {
        opacity: 1,
        duration: 0.5,
        onComplete: function () {
          // video start play
          document.querySelector('video').play();
        },
      },
      'slot+=0.05',
    );
}

function scrollHandle(tl, currentIndex) {
  gsap.to(document.querySelectorAll(`.slot__product:not(:nth-child(${currentIndex + 1}))`), { y: 20, duration: 0.5 });
  gsap.to(document.querySelectorAll('.slot__product')[currentIndex], {
    y: 0,
    duration: 0.5,
  });
}

function getCurrentIndex(documentScrollTop) {
  const slotElementLength = document.querySelectorAll('.slot__product').length;
  let currentIndex = documentScrollTop < triggerDistance ? 0 : Math.floor(documentScrollTop / triggerDistance);

  if (currentIndex >= slotElementLength) currentIndex = slotElementLength;

  return currentIndex;
}
