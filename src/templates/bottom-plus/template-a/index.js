import { actions } from '../../../constants';
import animate from './animate';
import './index.scss';

/** global variables */
let insDataSettings = {};
let documentScrollTop = 0;
let documentScrollHeight = 0;
/***** */

window.addEventListener('DOMContentLoaded', () => {
  window.parent.postMessage({
    action: actions.DATA,
  });
});

window.addEventListener('load', () => {
  // window.parent.postMessage({ action: 'AppierSlotHidden' }, '*');
  document.querySelector(
    '.scroll'
  ).innerHTML = `(scrollTop, scrollHeight) = (${documentScrollTop}, ${documentScrollHeight})`;

  console.log('[child loaded]');
  console.log('[insDataSetting] ', insDataSettings);
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
  }
});

function onFullScreenClick() {
  window.parent.postMessage({
    action: actions.FULLSCREEN,
  });
}

function onNormalClick() {
  window.parent.postMessage({
    action: actions.NORMAL,
  });
}

function onHiddenClick() {
  window.parent.postMessage({
    action: actions.HIDDEN,
  });
}

document
  .querySelector('.full-screen')
  .addEventListener('click', onFullScreenClick);
document.querySelector('.normal').addEventListener('click', onNormalClick);
document.querySelector('.hidden').addEventListener('click', onHiddenClick);
