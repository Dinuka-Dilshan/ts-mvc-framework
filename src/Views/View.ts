import { Modal } from "../Models/Modal";

export abstract class View<T extends Modal<K>, K> {
  constructor(private parent: Element | null, protected modal: T) {
    modal.on("change", () => {
      this.render();
    });
  }

  abstract template(): string;

  regions: { [key: string]: Element } = {};

  eventMap = (): { [key: string]: () => void } => {
    return {};
  };

  regionsMap = (): { [key: string]: string } => {
    return {};
  };

  mapRegions = (fragment: DocumentFragment): void => {
    const regionsMap = this.regionsMap();
    for (let key in regionsMap) {
      const selector: string = regionsMap[key];
      const element = fragment.querySelector(selector);
      if (element) {
        this.regions[key] = element;
      }
    }
  };

  bindEvents(fragment: DocumentFragment): void {
    const eventMap = this.eventMap();
    for (let key in eventMap) {
      const [eventName, selector] = key.split(":");
      fragment.querySelectorAll(selector).forEach((el) => {
        el.addEventListener(eventName, eventMap[key]);
      });
    }
  }

  onRender = (): void => {};

  render(): void {
    if (this.parent) {
      this.parent.innerHTML = "";
      const template = document.createElement("template");
      template.innerHTML = this.template();
      this.bindEvents(template.content);
      this.mapRegions(template.content);
      this.onRender();
      this.parent.appendChild(template.content);
    }
  }
}
