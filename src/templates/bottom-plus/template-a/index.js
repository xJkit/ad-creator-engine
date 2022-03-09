import { actions } from '../../../constants';
import animate from './animate';
import insDefaultSettings from './insDefaultSettings.json';
import './index.scss';

/** global variables */
let insDataSettings = insDefaultSettings;
let documentScrollTop = 0;
let documentScrollHeight = 0;
/***** */

window.addEventListener('DOMContentLoaded', () => {
  window.parent.postMessage({
    action: actions.LOADED,
    insDefaultSettings: insDefaultSettings,
  });
});

window.addEventListener('load', () => {
  document.querySelector(
    '.scroll'
  ).innerHTML = `(scrollTop, scrollHeight) = (${documentScrollTop}, ${documentScrollHeight})`;

  console.log('[child loaded]');
  console.log('[insDataSetting] ', insDataSettings);
  // start the animation
  animate();
});

window.addEventListener('message', (event) => {
  switch (event.data.action) {
    case actions.SCROLL:
      documentScrollTop = event.data.documentScrollTop;
      documentScrollHeight = event.data.documentScrollHeight;
      document.querySelector(
        '.scroll'
      ).innerHTML = `(scrollTop, scrollHeight) = (${documentScrollTop}, ${documentScrollHeight})`;
      break;
    case actions.DATA:
      insDataSettings = {
        ...insDataSettings,
        ...event.data.data,
      };
      break;
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
