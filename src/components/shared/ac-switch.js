import fanGray from "../../assets/images/icon-fan-gray.svg";
import waveGray from "../../assets/images/icon-wave-gray.svg";
import fanWhite from "../../assets/images/icon-fan-white.svg";
import waveWhite from "../../assets/images/icon-wave-white.svg";

class AcSwitch extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.isHeating = false;
    this.isOn = false;
  }

  static get observedAttributes() {
    return ["heating"];
  }

  attributeChangedCallback(attrName, oldValue, newValue) {
    if (attrName === "heating") {
      this.isHeating = newValue === "true";
      this.render();
    }
  }

  connectedCallback() {
    this.render();
    this.addEventListener("click", this.toggle.bind(this));
  }

  toggle() {
    this.isOn = !this.isOn;
    this.dispatchEvent(new CustomEvent("change", { detail: this.isOn }));
    this.render();
  }

  render() {
    const buttonText = this.isOn ? "ON" : "OFF";
    const buttonLabel = this.isHeating ? "HEAT" : "AC";
    const bgColor = this.isOn
      ? this.isHeating
        ? "linear-gradient(#ff5f59, #db1b15)"
        : "linear-gradient(#41a0ff, #1087ff)"
      : "white";
    const svgSrc =
      this.isHeating & this.isOn
        ? waveWhite
        : this.isHeating & !this.isOn
          ? waveGray
          : !this.isHeating & this.isOn
            ? fanWhite
            : fanGray;
    const textColor = this.isOn ? "white" : "#cccccc";

    this.shadowRoot.innerHTML = `
      <style>
        .ac-btn {
          position: absolute;
          width: 100px;
          height: 100px;
          display: flex;
          justify-content: center;
          background: ${bgColor};
          align-items: center;
          border-radius: 100px;
          color: ${textColor};
          font-weight: 600;
          cursor: pointer;
        }
        .ac-btn-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
        }
        .ac-btn-content-text {
          position: absolute;
          font-size: 10px;
          top: 20px;
        }
        .ac-btn-content-image {
          width: 25px;
        }
        .ac-btn-outer{
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 120px;
          border: none;
          height: 120px;
          border-radius: 100px;
          filter: ${this.isOn ? "drop-shadow(0px -4px 2px #c7c7c7)" : "drop-shadow(0px 2px 1px #c7c7c7)"};
          background: rgb(228,228,228);
          background: -moz-linear-gradient(199deg, rgba(228,228,228,1) 0%, rgba(255,255,255,1) 100%);
          background: -webkit-linear-gradient(199deg, rgba(228,228,228,1) 0%, rgba(255,255,255,1) 100%);
          background: linear-gradient(199deg, rgba(228,228,228,1) 0%, rgba(255,255,255,1) 100%);
          filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#e4e4e4",endColorstr="#ffffff",GradientType=1);

          @media (max-width: 1200px) {
            margin: 1rem auto;
          }
          &:hover {
            background: white;
          }
        }
      </style>
      <button class="ac-btn-outer" role="switch" tabindex="0" aria-checked="${this.isOn}">
        <div class="ac-btn">
          <div class="ac-btn-content">
            <span class="ac-btn-content-text">${buttonLabel} ${buttonText}</span>
            <img class="ac-btn-content-image" src="${svgSrc}" alt="${buttonLabel} icon">
          </div>
        </div>
      </button>
    `;
  }

  getCurrentValue() {
    return this.isOn;
  }
}

customElements.define("ac-switch", AcSwitch);
export { AcSwitch };
