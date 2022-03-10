export default class Template {
  static postMessage(...args) {
    return window.parent.postMessage(...args);
  }

  constructor() {
    // bind this execution contexts
    this.TemplateDOMLoad = this.TemplateDOMLoad.bind(this);
    this.TemplateDidLoad = this.TemplateDidLoad.bind(this);
    this.TemplateWillUnload = this.TemplateWillUnload.bind(this);
    this.message = this.message.bind(this);

    // prepare event listeners
    window.addEventListener('DOMContentLoaded', this.TemplateDOMLoad);
    window.addEventListener('load', this.TemplateDidLoad);
    window.addEventListener('message', this.message);

    // remove event listeners before page unloads
    window.onbeforeunload = () => {
      this.TemplateWillUnload();
      window.removeEventListener('DOMContentLoaded', this.TemplateDOMLoad);
      window.removeEventListener('load', this.TemplateDidLoad);
      window.removeEventListener('message', this.message);
    };
  }

  TemplateDOMLoad() {}
  TemplateDidLoad() {}
  TemplateWillUnload() {}
  message() {}
}
