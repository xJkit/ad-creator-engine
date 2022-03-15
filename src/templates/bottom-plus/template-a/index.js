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
  animate;
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
    // new Carousel({
    //   target: document.querySelectorAll('.expand__banner'),
    // });
  }

  TemplateDidLoad() {
    console.log('[child loaded]');
    console.log('[insDataSetting] ', this.insDataSettings);

    document.querySelector('.slot__general').addEventListener('click', this.expandIn);
    document.querySelector('.expand__withdraw').addEventListener('click', this.expandOut);

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
    gsap.to('.slot', { y: '0', ease: 'easeOut', duration: 0.3 });
    gsap.fromTo('.slot__banner', { scale: 1.3 }, { scale: 1, duration: 0.3 });
  }
}

export default new ButtomPlusTemplateA();
