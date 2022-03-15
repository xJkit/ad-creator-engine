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

  /**  Template Life Cycle */
  TemplateDOMLoad() {
    Template.postMessage({
      action: actions.LOADED,
      insDefaultSetting: insDefaultSetting,
    });
  }

  TemplateDidLoad() {
    console.log('[child loaded]');
    console.log('[insDataSetting] ', this.insDataSettings);
    this.onFullScreen();
    new Carousel({
      target: document.querySelectorAll('.expand__banner'),
    });
    // set slot height
    // document.querySelector('.slot').style.height = this.insDataSettings['data-height'] + 'px';

    // start the animation
    // this.animate = animate({
    //   renderHeight: {
    //     fullScreen: this.onFullScreen,
    //     normalScreen: this.onNormal,
    //   },
    // });
  }

  message(event) {
    switch (event.data.action) {
      case actions.SCROLL:
        this.documentScrollTop = event.data.documentScrollTop;
        this.documentScrollHeight = event.data.documentScrollHeight;
        // this.animate(this.documentScrollTop, this.documentScrollHeight);

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
}

export default new ButtomPlusTemplateA();
