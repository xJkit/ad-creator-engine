import { actions } from 'src/constants';
import animate from './animate';
import './index.scss';

/** global variables */
let documentScrollTop = 0;
let documentScrollHeight = 0;
let shouldPlayEntryAnimation = true; // optional
/***** */

window.addEventListener('load', () => {
  // window.parent.postMessage({ action: 'AppierSlotHidden' }, '*');
  const element = document.createElement('span');
  element.classList.add('content');
  element.innerHTML = `Appier Ads inside iframe:(scrollTop, scrollHeight) = (${documentScrollTop}, ${documentScrollHeight})`;
  document.body.appendChild(element);

  // start the animation
  animate();
});

window.addEventListener('message', (event) => {
  if (event.data.action === actions.SCROLL) {
    documentScrollTop = event.data.documentScrollTop;
    documentScrollHeight = event.data.documentScrollHeight;
    document.querySelector(
      '.content'
    ).innerHTML = `Appier Ads inside iframe:(scrollTop, scrollHeight) = (${documentScrollTop}, ${documentScrollHeight})`;
    // window.parent.postMessage({ action: 'AppierSlotFullscreen' }, '*');
  }
  if (event.data.action === actions.DATA) {
    console.log('child get ins data: ', event.data.data);
  }
});

var isStarted = false;
var start = function () {
  var i = 5;
  var timer = setInterval(() => {
    i -= 1;
    if (i === -1) {
      window.parent.postMessage({ action: actions.NORMAL }, '*');
      clearInterval(timer);
    }
  }, 1000);
};
