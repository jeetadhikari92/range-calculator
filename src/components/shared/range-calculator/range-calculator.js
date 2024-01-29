import carBase from "../../../assets/images/car-base.png";
import carBaseBig from "../../../assets/images/car-base@2x.png";
import carWheel from "../../../assets/images/car-wheel.png";
import carWheelBig from "../../../assets/images/car-wheel@2x.png";
import wheelSvg from "../../../assets/images/icon-wheel.svg";
import hundredD from "../../../assets/images/100d.png";
import hundredDbig from "../../../assets/images/100d@2x.png";
import pHundredD from "../../../assets/images/p100d.png";
import pHundredDbig from "../../../assets/images/p100d@2x.png";

import { RangeCalculatorStore } from "./range-calculator-store.js";
import { RangeObserver, TemperatureObserver, WheelObserver } from "./observers";
import "../list-item-selector.js";
import "../ac-switch.js";
import "../square-radio-buttons.js";
import "../range-display.js";

let paramElementCustomStyle = JSON.stringify({ width: "100%" });

class RangeCalculator extends HTMLElement {
  constructor(rangeData) {
    super();
    this.rangeCalculatorStore = new RangeCalculatorStore(
      rangeData.metric100D,
      rangeData.metricP100D,
    );
  }

  connectedCallback() {
    this.render();
    this.speedSelectorEl = this.querySelector("#speed-selector");
    this.tempSelectorrEl = this.querySelector("#temp-selector");
    this.wheelSelectorEl = this.querySelector("#wheel-selector");
    this.acSwitchEl = this.querySelector("#ac-switch-btn");
    this.carBaseImgEl = this.querySelector("#base-car-img");
    this.setAndNotifyObservers();
    this.addEventListeners();
    this.setRenderFns();
  }

  disconnectedCallback() {
    this.removeEventListeners();
  }

  render() {
    this.innerHTML = `
        <section class="range">
            <h2 class="range-header">Range per Charge</h2>
            <div class="range-image-container" aria-hidden="true">
                <img id="base-car-img" src="${carBaseBig}" srcset="${carBase} 800w, ${carBaseBig} 1600w" alt="Animated car with spinning wheels" />
                <div id="wheel1" class="range-image-container-wheel hidden">
                  <img src="${carWheelBig}" srcset="${carWheel} 800w, ${carWheelBig} 1600w" alt="Animated car with spinning wheels" />
                </div>
                <div id="wheel2" class="range-image-container-wheel hidden">
                  <img src="${carWheelBig}" srcset="${carWheel} 800w, ${carWheelBig} 1600w" alt="Animated car with spinning wheels" />
                </div>
                
            </div>
            <div class="range-result">
                <range-display id="100d-range" aria-label="Range for 100D">
                    <img class="range-result-img" src="${hundredDbig}" srcset="${hundredD} 800w, ${hundredDbig} 1600w" alt="100 D image" />
                </range-display>
                <range-display id="p100d-range" aria-label="Range for P100D">
                    <img class="range-result-img" src="${pHundredDbig}" srcset="${pHundredD} 800w, ${pHundredDbig} 1600w" alt="P 100 D image" />
                </range-display>
            </div>
            <div class="range-params">
                <div class="range-params-container ">
                    <label for="speed-selector" class="range-params-label">Speed</label>
                    <list-item-selector id="speed-selector" 
                        custom-styles='${paramElementCustomStyle}' 
                        items='[${this.rangeCalculatorStore.getSpeedsList().reverse()}]'
                        selected-index='${this.rangeCalculatorStore.getSpeedsList().length - 1}'>
                    </list-item-selector>
                </div>
                <hr>
                <div class="range-params-container">
                    <label for="temp-selector" class="range-params-label">Outside Temperature</label>
                        <list-item-selector id="temp-selector"
                            custom-styles='${paramElementCustomStyle}' 
                            items='[${this.rangeCalculatorStore.getTempList().reverse()}]'>
                        </list-item-selector>
                </div>
                <ac-switch id="ac-switch-btn" aria-label="Toggle Air Conditioning"></ac-switch>
                <hr>
                <div class="range-params-container">
                    <label for="wheel-selector" class="range-params-label">Wheels</label>
                    <square-radio-buttons id="wheel-selector" 
                        items='[${this.rangeCalculatorStore.getWheelSizeList()}]' 
                        custom-styles='${paramElementCustomStyle}'>
                    </square-radio-buttons>
                </div>
            </div>
            <p class="range-disclaimer-text">
              The actual amount of range that you experience will vary based on your particular use conditions.
              Your vehicle range is also dependent on other conditions, such as vehicle configuration, battery age and condition,
              driving style and operating, environmental and climate conditions. See how some of these particular use conditions 
              may affect your range in our simulation model.
            </p>
        </section>
        `;
  }

  setRenderFns() {
    this.speedSelectorEl.setRenderFunction(this.renderSpeedItemFn);
    this.tempSelectorrEl.setRenderFunction(this.renderTempItemFn);
    this.wheelSelectorEl.setRenderFunction(this.renderWheelBtnFn);
  }

  setAndNotifyObservers() {
    const hundredDObserver = new RangeObserver("100d-range", "100d");
    const pHundredDObserver = new RangeObserver("p100d-range", "p100d");
    const acObserver = new TemperatureObserver("ac-switch-btn", "heating");
    const wheelObserver = new WheelObserver("wheel1", "wheel2");

    this.rangeCalculatorStore.addObserver(hundredDObserver);
    this.rangeCalculatorStore.addObserver(pHundredDObserver);
    this.rangeCalculatorStore.addObserver(acObserver);
    this.rangeCalculatorStore.addObserver(wheelObserver);

    this.rangeCalculatorStore.notifyObservers();
  }

  addEventListeners() {
    this.speedSelectorEl.addEventListener(
      "change",
      this.handleParamsChange.bind(this),
    );
    this.tempSelectorrEl.addEventListener(
      "change",
      this.handleParamsChange.bind(this),
    );
    this.wheelSelectorEl.addEventListener(
      "change",
      this.handleParamsChange.bind(this),
    );
    this.acSwitchEl.addEventListener(
      "change",
      this.handleParamsChange.bind(this),
    );
    // Showing car wheels after base car image is loaded.
    this.carBaseImgEl.addEventListener("load", this.showWheels.bind(this));
  }

  removeEventListeners() {
    this.speedSelectorEl.removeEventListener(
      "change",
      this.handleParamsChange.bind(this),
    );
    this.tempSelectorrEl.removeEventListener(
      "change",
      this.handleParamsChange.bind(this),
    );
    this.wheelSelectorEl.removeEventListener(
      "change",
      this.handleParamsChange.bind(this),
    );
    this.acSwitchEl.removeEventListener(
      "change",
      this.handleParamsChange.bind(this),
    );
    this.carBaseImgEl.removeEventListener("load", this.showWheels.bind(this));
  }

  handleParamsChange() {
    const currentParams = {
      speed: this.speedSelectorEl.getCurrentValue(),
      temp: this.tempSelectorrEl.getCurrentValue(),
      ac: this.acSwitchEl.getCurrentValue(),
      wheelsize: parseInt(this.wheelSelectorEl.getCurrentValue()),
    };
    this.rangeCalculatorStore.setCurrentParams(currentParams);
  }

  updateRangeValue() {
    this.getElementById("100d-range").setAttribute(
      "range",
      this.rangeCalculatorStore.range100D,
    );
    this.getElementById("p100d-range").setAttribute(
      "range",
      this.rangeCalculatorStore.rangeP100D,
    );
  }

  dispatchParamChangeEvent(currentParams) {
    const paramChangeEvent = new CustomEvent("params-change", {
      bubbles: true,
      detail: currentParams,
    });
    this.dispatchEvent(paramChangeEvent);
  }

  // Calling this function to show wheels only when base car image is loaded.
  showWheels() {
    this.querySelectorAll(".range-image-container-wheel").forEach((el) => {
      el.classList.remove("hidden");
    });
  }

  renderSpeedItemFn(value) {
    return `
          <style>
          .list-item-one {
            font-size: 1.6rem;
          }
          .list-item-one-unit {
            font-size: 1rem;
            letter-spacing: 1px;
            margin-left: 0.5rem;
          }
          </style>
          <span class="list-item-one">${value}</span>
          <span class="list-item-one-unit">KMH</span>
        `;
  }

  renderTempItemFn(value) {
    return `
          <style>
          .list-item-one {
            font-size: 1.6rem;
          }
          </style>
          <span class="list-item-one">${value}&deg;</span>
        `;
  }

  renderWheelBtnFn(item) {
    return `
            <style>
            .wheel-btn-container {
                display: flex;
                gap: 2rem;
                font-family: 'Montserrat-Light';
                margin-left: 1rem;
                align-items: center;
            }
            .wheel-btn-value {
                font-size: 1.2rem;
            }
            </style>
            <div class="wheel-btn-container">
            <img width="${item * 2}px" src="${wheelSvg}" alt="${item} inch wheel" /><span class="wheel-btn-value">${item}''</span>
            </div>  
        `;
  }
}

customElements.define("range-calculator", RangeCalculator);
export { RangeCalculator };
