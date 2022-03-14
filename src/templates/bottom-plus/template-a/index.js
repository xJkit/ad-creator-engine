import Template from 'common/Template';
import { actions } from 'src/constants';
import animate from './animate';
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
    // document.querySelector(
    //   '.scroll',
    // ).innerHTML = `(scrollTop, scrollHeight) = (${this.documentScrollTop}, ${this.documentScrollHeight})`;

    console.log('[child loaded]');
    console.log('[insDataSetting] ', this.insDataSettings);

    // document.querySelector('.full-screen').addEventListener('click', this.onFullScreenClick);
    // document.querySelector('.normal').addEventListener('click', this.onNormalClick);
    // document.querySelector('.hidden').addEventListener('click', this.onHiddenClick);

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
  currentPositionTransform = (documentScrollTop) => {
    const sp = documentScrollTop < this.triggerDistance ? 0 : Math.floor(documentScrollTop / this.triggerDistance);
    console.log(this.slotElementLength);
  };

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
