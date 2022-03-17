import { gsap } from 'gsap';
import Template from 'common/Template';
import { actions } from 'src/constants';
import animate from './animate';
import Carousel from './Carousel';
import insDefaultSetting from './insDefaultSetting.json';
import './index.scss';

class ButtomPlusTemplateA extends Template {
  /** global properties */
  insDataSettings = insDefaultSetting;
  documentScrollTop = 0;
  documentScrollHeight = 0;
  videoCurrentTime = 0;
  animate;
  pointerX;
  /***** */
  constructor() {
    super();
    this.expandIn = this.expandIn.bind(this);
    this.expandOut = this.expandOut.bind(this);
  }

  /**  Template Life Cycle */
  TemplateDOMLoad() {
    Template.postMessage({
      action: actions.LOADED,
      insDefaultSetting: insDefaultSetting,
    });
    new Carousel({
      target: document.querySelectorAll('.expand__banner'),
    });
  }

  TemplateDidLoad() {
    console.log('[child loaded]');
    console.log('[insDataSetting] ', this.insDataSettings);

    document.querySelector('.slot__general').addEventListener('click', this.expandIn);
    document.querySelector('.expand__withdraw').addEventListener('click', this.expandOut);
    document.querySelectorAll('.slot__volume').forEach((el) => {
      el.addEventListener('touchend', this.toggleVolume);
    });
    document.querySelector('.slot__container').addEventListener('touchstart', (e) => {
      this.pointerX = e.touches[0].clientX;
    });
    document.querySelector('.slot__container').addEventListener('touchend', (e) => {
      if (Math.abs(e.changedTouches[0].clientX - this.pointerX) > 50) {
        this.expandIn();
      }
    });

    // set slot height
    document.querySelector('.slot').style.height = this.insDataSettings['data-height'] + 'px';

    // start the animation
    this.animate = animate({
      renderHeight: {
        fullScreen: this.onFullScreen,
        normalScreen: this.onNormal,
      },
    });
  }

  message(event) {
    switch (event.data.action) {
      case actions.SCROLL:
        this.documentScrollTop = event.data.documentScrollTop;
        this.documentScrollHeight = event.data.documentScrollHeight;
        this.animate(this.documentScrollTop, this.documentScrollHeight);

        break;
      case actions.DATA:
        this.insDataSettings = {
          ...event.data.data,
        };
        break;
    }
  }

  /** Other Custom Methods  */
  onFullScreen = () => {
    Template.postMessage({
      action: actions.FULLSCREEN,
    });
  };

  onNormal = () => {
    Template.postMessage({
      action: actions.NORMAL,
    });
  };

  onHiddenClick = () => {
    Template.postMessage({
      action: actions.HIDDEN,
    });
  };

  expandIn() {
    this.onFullScreen();
    gsap.to('.slot', { y: '100%', ease: 'easeOut', duration: 0.5 });
    gsap.to('.expand', { opacity: 1, visibility: 'visible', duration: 0.5 });

    // Main Banner video pause
    document.querySelector('.slot__video video').pause();
    this.videoCurrentTime = document.querySelector('.slot__video video').currentTime;
    // Expand Banner video extend Main Banner video currentTime and play
    document.querySelector('.expand__video video').currentTime = this.videoCurrentTime;
    document.querySelector('.expand__video video').play();
  }
  expandOut() {
    gsap.to('.expand', {
      opacity: 0,
      duration: 0.5,
      onComplete: () => {
        gsap.set('.expand', { visibility: 'hidden' });
        this.onNormal();
      },
    });
    gsap.to('.slot', {
      y: '0',
      ease: 'easeOut',
      duration: 0.3,
      onComplete: () => {
        document.querySelector('.slot__video video').play();
      },
    });
    gsap.fromTo('.slot__banner', { scale: 1.3 }, { scale: 1, duration: 0.3 });

    // Expand Banner video pause
    document.querySelector('.expand__video video').pause();
    this.videoCurrentTime = document.querySelector('.expand__video video').currentTime;
    // Main Banner video extend Expand Banner  video currentTime and play
    document.querySelector('.slot__video video').currentTime = this.videoCurrentTime;
    document.querySelector('.slot__video video').play();
  }
  toggleVolume(e) {
    e.stopPropagation();
    this.dataset.sound = this.dataset.sound === 'off' ? 'on' : 'off';
    this.nextElementSibling.muted = !this.nextElementSibling.muted;
  }
}

export default new ButtomPlusTemplateA();
