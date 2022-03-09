/* Ads loading order:
 ** 1. play opening animation
 ** 2. appier slot state changes: hidden -> normal
 */

/** global variables */
// parent document dimensions
let documentScrollTop = 0;
let documentScrollHeight = 0;

window.addEventListener('message', function (event) {
  if (event.data.action === 'AppierSlotScroll') {
    documentScrollTop = event.data.documentScrollTop;
    documentScrollHeight = event.data.documentScrollHeight;
    document.querySelector(
      '.content'
    ).innerHTML = `Appier Ads inside iframe:(scrollTop, scrollHeight) = (${documentScrollTop}, ${documentScrollHeight})`;
    // window.parent.postMessage({ action: 'AppierSlotFullscreen' }, '*');
  }
  if (event.data.action === 'AppierSlotData') {
    console.log('child get ins data: ', event.data.data);
  }
});

var isStarted = false;
var start = function () {
  var i = 5;
  var timer = setInterval(() => {
    i -= 1;
    if (i === -1) {
      window.parent.postMessage({ action: 'AppierSlotNormal' }, '*');
      clearInterval(timer);
    }
  }, 1000);
};

window.addEventListener('load', function () {
  // window.parent.postMessage({ action: 'AppierSlotHidden' }, '*');
  const element = document.createElement('span');
  element.classList.add('content');
  element.innerHTML = `Appier Ads inside iframe:(scrollTop, scrollHeight) = (${documentScrollTop}, ${documentScrollHeight})`;
  document.body.appendChild(element);
});
