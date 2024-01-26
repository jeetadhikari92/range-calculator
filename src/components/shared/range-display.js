class RangeDisplay extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const rangeValue = this.getAttribute("range") || "0";

    this.shadowRoot.innerHTML = `
        <style>
            .range-display {
                display: flex;
                flex-direction: column;
                gap: 1rem;
            }
            
            .range-display-image {
                width: 100%;
            }
            
            .range-display-value {
                display: flex;
                align-items: flex-start;
                color: #008dff;
                gap: 0.5rem;
            }
            
            .range-display-value-text {
                font-size: 50px; 
            }
            
            .range-display-value-unit {
                font-size: 20px;
                margin-top: 0.5rem;
                font-weight: 100;
            }
            
        </style>
        
        <section class="range-display">
            <div class="range-display-image">
                <slot role="img" aria-label="Range Display Image"></slot>
            </div>
            
            <div class="range-display-value" aria-live="polite">
                <span class="range-display-value-text">
                    ${rangeValue}
                </span>
                <span class="range-display-value-unit">
                    KM
                </span>
            </div>
        </section>
    `;
  }

  static get observedAttributes() {
    return ["range"];
  }

  attributeChangedCallback(attrName, oldValue, newValue) {
    if (attrName === "range") {
      this.render();
    }
  }
}

customElements.define("range-display", RangeDisplay);
