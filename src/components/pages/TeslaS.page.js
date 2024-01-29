import "../shared/explandable-container.js";
import carBackground from "../../assets/images/hero-image.png";
import carBackgroundBigImage from "../../assets/images/hero-image@2x.png";

class TeslaSPage extends HTMLElement {
  constructor() {
    super();
    this.onExpandableContainerToggle =
      this.onExpandableContainerToggle.bind(this);
  }

  connectedCallback() {
    this.render();
    this.addEventListeners();
    this.observeForAnimation();
  }

  disconnectedCallback() {
    this.removeEventListeners();
  }

  render() {
    this.innerHTML = `
      <main class="main">
        <section class="main-intro">
          <!-- Loading image size depending on the screen width -->
          <img class="main-intro-background" src="${carBackgroundBigImage}" 
            srcset="${carBackground} 800w, ${carBackgroundBigImage} 1600w" 
            alt="Tesla S background image" />
        </section>
        <section class="main-text">
          <h1 class="main-text-header hidden" tab-index="0">
              Far far away, behind the word mountains…
          </h1>
          <p class="main-text-subtext hidden">
              A small river named Duden flows by their place and supplies it with
              the necessary regelialia. It is a paradisematic country, in which
              roasted parts of sentences fly into your mouth.
          </p>
        </section>
        <expandable-container class="range-calculator-container hidden">
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

    // Prepare to lazy load the range calculator if it doesnt exist already.
    if (!existingRangeSelectorComponent) {
      this.setupRangeCalculator(expandableContainer).then(() => {
        requestAnimationFrame(() => expandableContainer.scrollToBottom());
      });
    } else {
      requestAnimationFrame(() => expandableContainer.scrollToBottom());
    }
  }

  async setupRangeCalculator(containerEl) {
    // Lazy loading the data and range-calulator component only when arow is clicked.
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

  observeForAnimation() {
    const animationObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        } else {
          entry.target.classList.remove("show");
        }
      });
    });
    const hiddenElement = this.querySelectorAll(".hidden");
    hiddenElement.forEach((el) => animationObserver.observe(el));
  }
}

customElements.define("tesla-s-page", TeslaSPage);
export { TeslaSPage };
