import { actions } from './constants';

let iframe;

window.addEventListener('load', function () {
  var insTag = document.getElementById('appier-ins-template-config');
  var urlParams = new URLSearchParams(window.location.search);
  var previewUrl =
    urlParams.get('url') || insTag.getAttribute('data-preview-url');
  var data = Array.prototype.slice
    .call(insTag.attributes)
    .reduce(function (acc, attr) {
      return attr.nodeName.indexOf('data-') === 0
        ? Object.assign(acc, { [attr.nodeName]: attr.nodeValue })
        : acc;
    }, {});

  // Ad contents itself
  iframe = document.createElement('iframe');
  iframe.style = 'width: 100%; height: 100%;';
  iframe.setAttribute('allowtransparency', true);
  iframe.src = previewUrl;

  // Ad content wrapper slot DOM: change dimensions by postMessage event below
  var slot = document.createElement('div');
  var height = parseInt(insTag.getAttribute('data-height'), 10) || 100;
  slot.id = 'appier_preview_slot';
  slot.style =
    'z-index: 2147483647; bottom: 0; left: 0; position: fixed; width: 100%; height: ' +
    height +
    'px; display: block;';
  slot.appendChild(iframe);

  insTag.parentNode.insertBefore(slot, insTag.nextSibling);

  iframe.contentWindow.postMessage(
    {
      action: actions.DATA,
      data: data,
    },
    '*'
  );
});

window.addEventListener('scroll', function (event) {
  iframe.contentWindow.postMessage(
    {
      action: actions.SCROLL,
      documentScrollTop: document.documentElement.scrollTop,
      documentScrollHeight: document.documentElement.scrollHeight,
    },
    '*'
  );
});

window.addEventListener('message', function (event) {
  switch (event.data.action) {
    case actions.FULLSCREEN:
      slot.style.width = '100%';
      slot.style.height = '100%';
      break;
    case actions.HIDDEN:
      slot.style.width = '0';
      slot.style.height = '0';
      break;
    case actions.NORMAL:
      slot.style.width = '100%';
      slot.style.height = height + 'px';
      break;
  }
});

window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};
