document.addEventListener('DOMContentLoaded', function (event) {
  const element = document.createElement('h1');
  element.innerHTML = 'Hello??';
  document.body.appendChild(element);
  bootstrap();
});

function bootstrap() {
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
    window.parent.postMessage({ action: 'AppierSlotHidden' }, '*');
  });

  window.addEventListener('message', function (event) {
    if (event.data.action === 'AppierSlotScroll' && !isStarted) {
      window.parent.postMessage({ action: 'AppierSlotFullscreen' }, '*');
      start();
      isStarted = true;
    }
    if (event.data.action === 'AppierSlotData') {
      console.log('child get ins data: ', event.data.data);
    }
  });
}
