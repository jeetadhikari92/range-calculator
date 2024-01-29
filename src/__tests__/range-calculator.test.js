import { RangeCalculator } from "../components/shared/range-calculator/range-calculator";

import hundredDjson from "../data/metric-100D.json";
import phundredDjson from "../data/metric-P100D.json";

describe("RangeCalculator", () => {
  let rangeCalculator;

  beforeEach(() => {
    rangeCalculator = new RangeCalculator({
      metric100D: hundredDjson,
      metricP100D: phundredDjson,
    });
    document.body.appendChild(rangeCalculator);
  });

  afterEach(() => {
    document.body.removeChild(rangeCalculator);
  });

  test("current Params and range is set on initialisation", async () => {
    const currentParams = rangeCalculator.rangeCalculatorStore.currentParams;
    expect(currentParams).toEqual({
      speed: 70,
      temp: 40,
      ac: "off",
      wheelsize: 19,
    });
    expect(document.getElementById("100d-range").getAttribute("range")).toBe(
      "853",
    );
    expect(document.getElementById("p100d-range").getAttribute("range")).toBe(
      "822",
    );
  });

  test("range updated when speed is changed", () => {
    const speedSelectorEl = document.getElementById("speed-selector");
    // simulating the up button click to increase speed from default 70 to 80kmph
    speedSelectorEl.shadowRoot.getElementById("listSelectorUpBtn").click();
    const currentParams = rangeCalculator.rangeCalculatorStore.currentParams;

    expect(currentParams).toEqual({
      speed: 80,
      temp: 40,
      ac: "off",
      wheelsize: 19,
    });
    expect(document.getElementById("100d-range").getAttribute("range")).toBe(
      "763",
    );
    expect(document.getElementById("p100d-range").getAttribute("range")).toBe(
      "736",
    );
  });

  test("range updated when temperature is lowered, ac is on and wheel is bigger", () => {
    const tempSelectorEl = document.getElementById("temp-selector");
    const acBtnEl = document.getElementById("ac-switch-btn");
    const wheelSelectorEl = document.getElementById("wheel-selector");

    // simulating the clicks, changing value of temp from 40 to 30deg, ac from off to on and wheel size from 19 to 21
    tempSelectorEl.shadowRoot.getElementById("listSelectorDownBtn").click();
    acBtnEl.click();
    wheelSelectorEl.shadowRoot.querySelectorAll("button")[1].click(); // clicing the second button

    const currentParams = rangeCalculator.rangeCalculatorStore.currentParams;

    expect(currentParams).toEqual({
      speed: 70,
      temp: 30,
      ac: "on",
      wheelsize: 21,
    });
    expect(document.getElementById("100d-range").getAttribute("range")).toBe(
      "751",
    );
    expect(document.getElementById("p100d-range").getAttribute("range")).toBe(
      "693",
    );
  });
});
