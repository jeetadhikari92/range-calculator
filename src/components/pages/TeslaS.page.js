import "../shared/explandable-container.js";
import carBackgroundSmallImage from "../../assets/images/hero-image.png";
import carBackgroundImage from "../../assets/images/hero-image@2x.png";

class TeslaSPage extends HTMLElement {
  constructor() {
    super();
    this.onExpandableContainerToggle =
      this.onExpandableContainerToggle.bind(this);
  }

  connectedCallback() {
    this.render();
    this.addEventListeners();
  }

  disconnectedCallback() {
    this.removeEventListeners();
  }

  render() {
    this.innerHTML = `
      <main class="main">
        <section class="main-intro">
          <img class="main-intro-background" src="${carBackgroundImage}" 
            srcset="${carBackgroundSmallImage} 800w, ${carBackgroundImage} 1600w" 
            alt="Tesla S background image" />
        </section>
        <section class="main-text">
          <h1 class="main-text-header animate" tab-index="0">
              Far far away, behind the word mountains…
          </h1>
          <p class="main-text-subtext animate">
              A small river named Duden flows by their place and supplies it with
              the necessary regelialia. It is a paradisematic country, in which
              roasted parts of sentences fly into your mouth.
          </p>
        </section>
        <expandable-container class="range-calculator-container">
        </expandable-container>
      </main>
    `;
  }

  addEventListeners() {
    this.querySelector("expandable-container").addEventListener(
      "toggle",
      this.onExpandableContainerToggle,
    );
  }

  removeEventListeners() {
    this.querySelector("expandable-container").removeEventListener(
      "toggle",
      this.onExpandableContainerToggle,
    );
  }

  async onExpandableContainerToggle() {
    const expandableContainer = this.querySelector("expandable-container");
    const existingRangeSelectorComponent =
      expandableContainer.querySelector("range-calculator");
    if (!existingRangeSelectorComponent) {
      this.setupRangeCalculator(expandableContainer).then(() => {
        requestAnimationFrame(() => expandableContainer.scrollToBottom());
      });
    } else {
      requestAnimationFrame(() => expandableContainer.scrollToBottom());
    }
  }

  async setupRangeCalculator(containerEl) {
    const rangeData = await this.loadData();
    const { RangeCalculator } = await import(
      "../shared/range-calculator/range-calculator.js"
    );
    const rangeCalculatorInstance = new RangeCalculator(rangeData);
    containerEl.appendChild(rangeCalculatorInstance);
  }

  async loadData() {
    const metric100D = await import("../../data/metric-100D.json");
    const metricP100D = await import("../../data/metric-P100D.json");
    return { metric100D: metric100D.default, metricP100D: metricP100D.default };
  }
}

customElements.define("tesla-s-page", TeslaSPage);
export { TeslaSPage };
