export class TemperatureObserver {
  constructor(elementId, attributeName) {
    this.observerElement = document.getElementById(elementId);
    this.attributeName = attributeName;
  }

  update(model) {
    const isHeatingOn = model.currentParams.temp <= 10;
    this.observerElement.setAttribute(this.attributeName, isHeatingOn);
  }
}
