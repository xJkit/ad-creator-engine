import { actions } from './constants';

let iframe;
let insDataSettings;
let slotElement;
let slotHeight;

window.addEventListener('load', function () {
  console.log('[parent loaded]');
  const insTag = document.getElementById('appier-ins-template-config');
  insDataSettings = Array.prototype.slice.call(insTag.attributes).reduce(function (acc, attr) {
    return attr.nodeName.indexOf('data-') === 0 ? Object.assign(acc, { [attr.nodeName]: attr.nodeValue }) : acc;
  }, {});
  console.log('insDataSettings: ', insDataSettings);
  const urlParams = new URLSearchParams(window.location.search);
  const previewUrl = urlParams.get('url') || insDataSettings['data-preview-url'];

  // Ad contents itself
  iframe = document.createElement('iframe');
  iframe.style = 'width: 100%; height: 100%;';
  iframe.setAttribute('allowtransparency', true);
  iframe.src = previewUrl;

  // Ad content wrapper slot DOM: change dimensions by postMessage event below
  slotElement = document.createElement('div');
  slotHeight = parseInt(insDataSettings['data-height'], 10) || 0;
  slotElement.id = 'appier_preview_slot';
  slotElement.style =
    'z-index: 2147483647; bottom: 0; left: 0; position: fixed; width: 100%; height: ' +
    slotHeight +
    'px; display: block;';
  slotElement.appendChild(iframe);

  insTag.parentNode.insertBefore(slotElement, insTag.nextSibling);
});

window.addEventListener('scroll', function (event) {
  iframe.contentWindow.postMessage(
    {
      action: actions.SCROLL,
      documentScrollTop: document.documentElement.scrollTop,
      documentScrollHeight: document.documentElement.scrollHeight,
    },
    '*',
  );
});

window.addEventListener('message', function (event) {
  switch (event.data.action) {
    case actions.FULLSCREEN:
      slotElement.style.width = '100%';
      slotElement.style.height = '100%';
      break;
    case actions.HIDDEN:
      slotElement.style.width = '0';
      slotElement.style.height = '0';
      break;
    case actions.NORMAL:
      slotElement.style.width = '100%';
      slotElement.style.height = slotHeight + 'px';
      break;
    case actions.LOADED: {
      const defaultSetting = event.data.insDefaultSetting || {};
      insDataSettings = { ...defaultSetting, ...insDataSettings };
      slotHeight = parseInt(insDataSettings['data-height'], 10);
      slotElement.style.height = slotHeight + 'px';
      iframe.contentWindow.postMessage(
        {
          action: actions.DATA,
          data: insDataSettings,
        },
        '*',
      );
      break;
    }
  }
});

window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};
