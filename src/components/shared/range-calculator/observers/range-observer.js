export class RangeObserver {
  constructor(elementId, type) {
    this.type = type;
    this.rangeElement = document.getElementById(elementId);
  }

  update(model) {
    const range =
      this.type === "100d"
        ? model.range100D
        : this.type === "p100d"
          ? model.rangeP100D
          : console.error("invalid type");
    this.rangeElement.setAttribute("range", range);
  }
}
