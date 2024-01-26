import stringToJson from "../../utils/string-to-json.js";

class SquareRadioButtons extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    const templateContent = `
            <style>
                #square-radio-buttons-container {
                    display: flex;
                    gap: 1rem;

                    @media (max-width: 600px) {
                      flex-direction: column;
                    }
                }

                .square-radio-button {
                    background-color: #F0F2F7;
                    display: flex;
                    padding: 1rem 1rem;
                    border: 1px solid #B9BED1;
                    height: 80px;
                    align-items: center;
                    cursor: pointer;
                    border-radius: 4px;
                }

                .selected {
                    border: 2px solid #007bff;
                }
            </style>

            <div role="radiogroup" id="square-radio-buttons-container"></div>
        `;

    this.shadowRoot.innerHTML = templateContent;
    this.buttonsContainer = this.shadowRoot.getElementById(
      "square-radio-buttons-container",
    );
    this.buttonsContainer.addEventListener(
      "click",
      this.handleButtonClick.bind(this),
    );
  }

  disconnectedCallback() {
    this.buttonsContainer.removeEventListener(
      "click",
      this.handleButtonClick.bind(this),
    );
  }

  static get observedAttributes() {
    return ["items", "custom-styles"];
  }

  attributeChangedCallback(attrName, oldValue, newValue) {
    if (attrName === "items") {
      this.renderButtons();
    } else if (attrName === "custom-styles") {
      this.applyCustomStyles(newValue);
    }
  }

  applyCustomStyles(customStyles) {
    const buttonElements = this.shadowRoot.querySelectorAll("button");
    buttonElements.forEach((el) => {
      Object.assign(el.style, stringToJson(customStyles));
    });
  }

  setRenderFunction(renderFunction) {
    this.renderFunction = renderFunction;
    this.renderButtons();
    this.applyCustomStyles(this.getAttribute("custom-styles"));
  }

  renderButtons() {
    const items = JSON.parse(this.getAttribute("items")) || [];
    this.buttonsContainer.innerHTML = "";

    items.forEach((item, i) => {
      const button = document.createElement("button");
      button.classList.add("square-radio-button");
      button.setAttribute("role", "radio");
      button.setAttribute("aria-checked", i === 0 ? "true" : "false");
      button.setAttribute("tabindex", "0");
      const content = this.renderFunction ? this.renderFunction(item) : item;
      button.innerHTML = content;
      button.value = item;

      if (i === 0) {
        button.classList.add("selected");
        this.selectedValue = item;
      }

      this.buttonsContainer.appendChild(button);
    });
  }

  handleButtonClick(event) {
    const button = event.target.closest("button");

    if (button) {
      this.selectedValue = button.value;
      this.shadowRoot.querySelectorAll("button").forEach((btn) => {
        btn.classList.remove("selected");
        btn.setAttribute("aria-checked", "false");
      });

      button.classList.add("selected");
      button.setAttribute("aria-checked", "true");

      this.dispatchEvent(
        new CustomEvent("change", { detail: this.selectedValue }),
      );
    }
  }

  getCurrentValue() {
    return this.selectedValue;
  }
}

customElements.define("square-radio-buttons", SquareRadioButtons);
