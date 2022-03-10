export default class Template {
  static postMessage(...args) {
    return window.parent.postMessage(...args);
  }

  constructor() {
    this.TemplateDOMLoad = this.TemplateDOMLoad.bind(this);
    this.TemplateDidLoad = this.TemplateDidLoad.bind(this);
    this.message = this.message.bind(this);
    window.addEventListener('DOMContentLoaded', this.TemplateDOMLoad);
    window.addEventListener('load', this.TemplateDidLoad);
    window.addEventListener('message', this.message);
  }

  TemplateDOMLoad() {}
  TemplateDidLoad() {}
  message() {}
}
