export class RangeCalculatorStore {
  constructor(metric100D, metricP100D) {
    this.metric100D = metric100D;
    this.metricP100D = metricP100D;

    this.speedList = this.getSpeedsList();
    this.tempList = this.getTempList();
    this.wheelsizeList = this.getWheelSizeList();
    
    this.currentParams = {
      speed: this.speedList[0],
      temp: this.tempList[this.tempList.length - 1],
      ac: "off",
      wheelsize: this.wheelsizeList[0],
    };
    this.observers = [];
  }

  addObserver(observer) {
    this.observers.push(observer);
  }

  notifyObservers() {
    this.observers.forEach((observer) => {
      observer.update(this);
    });
  }

  setCurrentParams(currentParams) {
    this.currentParams = {
      ...currentParams,
      ac: currentParams.ac ? "on" : "off",
    };
    this.notifyObservers();
  }

  get range100D() {
    const selectedRangeObject = this.metric100D.find((rangeData) => {
      return (
        rangeData.temp === this.currentParams.temp &&
        rangeData.wheelsize === this.currentParams.wheelsize &&
        rangeData.ac === this.currentParams.ac
      );
    });
    return selectedRangeObject?.hwy.find(
      (hwyObject) => hwyObject.kmh === this.currentParams.speed,
    ).kilometers;
  }

  get rangeP100D() {
    const selectedRangeObject = this.metricP100D.find((rangeData) => {
      return (
        rangeData.temp === this.currentParams.temp &&
        rangeData.wheelsize === this.currentParams.wheelsize &&
        rangeData.ac === this.currentParams.ac
      );
    });
    return selectedRangeObject?.hwy.find(
      (hwyObject) => hwyObject.kmh === this.currentParams.speed,
    ).kilometers;
  }

  getSpeedsList() {
    return this.metric100D[0].hwy.map((hwyObj) => hwyObj.kmh);
  }

  getTempList() {
    return Array.from(new Set(this.metric100D.map((metric) => metric.temp)));
  }

  getWheelSizeList() {
    return Array.from(
      new Set(this.metric100D.map((metric) => metric.wheelsize)),
    );
  }
}
