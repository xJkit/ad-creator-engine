import { actions } from 'src/constants';
import animate from './animate';
import './index.scss';

/** global variables */
let insDataSettings = {};
let documentScrollTop = 0;
let documentScrollHeight = 0;
/***** */

window.addEventListener('DOMContentLoaded', () => {
  console.log('child content loaded');
  window.parent.postMessage({
    action: actions.DATA,
  });
});

window.addEventListener('load', () => {
  // window.parent.postMessage({ action: 'AppierSlotHidden' }, '*');
  document.querySelector(
    '.scroll'
  ).innerHTML = `(scrollTop, scrollHeight) = (${documentScrollTop}, ${documentScrollHeight})`;

  // start the animation
  animate();
});

window.addEventListener('message', (event) => {
  if (event.data.action === actions.SCROLL) {
    documentScrollTop = event.data.documentScrollTop;
    documentScrollHeight = event.data.documentScrollHeight;
    document.querySelector(
      '.scroll'
    ).innerHTML = `(scrollTop, scrollHeight) = (${documentScrollTop}, ${documentScrollHeight})`;
    // window.parent.postMessage({ action: 'AppierSlotFullscreen' }, '*');
  }
  if (event.data.action === actions.DATA) {
    insDataSettings = event.data.data;
    console.log('[insDataSettings] ', insDataSettings);
  }
});
