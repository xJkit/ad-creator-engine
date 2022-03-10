import Template from '../../../common/Template';
import { actions } from '../../../constants';
import animate from './animate';
import insDefaultSettings from './insDefaultSettings.json';
import './index.scss';

class ButtomPlusTemplateA extends Template {
  /** global properties */
  insDataSettings = insDefaultSettings;
  documentScrollTop = 0;
  documentScrollHeight = 0;
  /***** */

  TemplateDOMLoad() {
    Template.postMessage({
      action: actions.LOADED,
      insDefaultSettings: insDefaultSettings,
    });
  }

  TemplateDidLoad() {
    document.querySelector(
      '.scroll'
    ).innerHTML = `(scrollTop, scrollHeight) = (${this.documentScrollTop}, ${this.documentScrollHeight})`;

    console.log('[child loaded]');
    console.log('[insDataSetting] ', this.insDataSettings);
    // start the animation
    animate();

    document
      .querySelector('.full-screen')
      .addEventListener('click', this.onFullScreenClick);
    document
      .querySelector('.normal')
      .addEventListener('click', this.onNormalClick);
    document
      .querySelector('.hidden')
      .addEventListener('click', this.onHiddenClick);
  }

  message(event) {
    switch (event.data.action) {
      case actions.SCROLL:
        this.documentScrollTop = event.data.documentScrollTop;
        this.documentScrollHeight = event.data.documentScrollHeight;
        document.querySelector(
          '.scroll'
        ).innerHTML = `(scrollTop, scrollHeight) = (${this.documentScrollTop}, ${this.documentScrollHeight})`;
        break;
      case actions.DATA:
        this.insDataSettings = {
          ...this.insDataSettings,
          ...event.data.data,
        };
        break;
    }
  }

  onFullScreenClick = () => {
    Template.postMessage({
      action: actions.FULLSCREEN,
    });
  };

  onNormalClick = () => {
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
