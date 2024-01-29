import chevronThinUpSvg from "../../assets/images/icon-thin-chevron-up.svg";
import chevronThinDownSvg from "../../assets/images/icon-thin-chevron-down.svg";
import stringToJson from "../../utils/string-to-json.js";

class ListItemSelector extends HTMLElement {
  constructor() {
    super();

    this.items = [];
    this.selectedIndex = 0;
    this.renderFunction = null;

    this.attachShadow({ mode: "open" });
    this.handleUpClick = this.handleUpClick.bind(this);
    this.handleDownClick = this.handleDownClick.bind(this);
  }

  connectedCallback() {
    this.render();
    this.addEventListeners();
  }

  disconnectedCallback() {
    this.removeEventListeners();
  }

  static get observedAttributes() {
    return ["items", "custom-styles", "selected-index"];
  }

  attributeChangedCallback(attrName, oldValue, newValue) {
    if (attrName === "items") {
      this.items = JSON.parse(newValue);
      this.render();
    } else if (attrName === "custom-styles") {
      this.applyCustomStyles(newValue);
    } else if(attrName === "selected-index") {
      this.selectedIndex = parseInt(newValue);
    }
  }

  applyCustomStyles(customStyles) {
    const listElement = this.shadowRoot.querySelector(".list-item-selector");
    if (listElement && customStyles) {
      Object.assign(listElement.style, stringToJson(customStyles));
    }
  }

  setRenderFunction(renderFunction) {
    this.renderFunction = renderFunction;
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
            <style>
                .list-item-selector {
                    background-color: #F0F2F7;
                    display: flex;
                    border: 1px solid #B9BED1;
                    align-items: center;
                    height: 80px;
                }
                
                .list-item-selector-value {
                    font-size: 2rem;
                    margin-left: 2rem;
                }
                
                .list-item-selector-actions {
                    margin-left: auto;
                    display: flex;
                    flex-direction: column;
                }
                
                .list-item-selector-actions > hr {
                    height: 2px;
                    width: 30px;
                    border: none;
                    background-color: #B9BED1;
                }
                
                .list-item-selector-actions > button {
                    width: 61px;
                    height: 24px;
                    background-repeat: no-repeat;
                    background-position: center;
                    border: none;
                    background-color: transparent;
                    cursor: pointer; /* Adding cursor pointer for better accessibility */
                }
                
                .list-item-selector-actions--up {
                    background-image: url('${chevronThinUpSvg}');
                }
                
                .list-item-selector-actions--down {
                    background-image: url('${chevronThinDownSvg}');
                }
            </style>
            
            <article role="listbox" class="list-item-selector">
                <span class="list-item-selector-value">${this.renderSelectedItem()}</span>
                <div class="list-item-selector-actions">
                    <button id="listSelectorUpBtn"
                            class="list-item-selector-actions--up"
                            style='filter: grayscale(${this.selectedIndex === 0 ? 1 : 0})'
                            aria-label="Move Up"
                            ${this.selectedIndex === 0 ? 'disabled aria-disabled="true"' : ""}
                    ></button>
                    <hr role="separator">
                    <button id="listSelectorDownBtn"
                            class="list-item-selector-actions--down"
                            style='filter: grayscale(${this.selectedIndex === this.items.length - 1 ? 1 : 0})'
                            aria-label="Move Down"
                            ${this.selectedIndex === this.items.length - 1 ? 'disabled aria-disabled="true"' : ""}
                    ></button>
                </div>
            </article>
        `;

    this.addEventListeners();
    this.applyCustomStyles(this.getAttribute("custom-styles"));
  }

  renderSelectedItem() {
    if (this.renderFunction) {
      return this.renderFunction(this.items[this.selectedIndex]);
    } else {
      return this.items[this.selectedIndex];
    }
  }

  addEventListeners() {
    this.shadowRoot
      .getElementById("listSelectorUpBtn")
      .addEventListener("click", this.handleUpClick);
    this.shadowRoot
      .getElementById("listSelectorDownBtn")
      .addEventListener("click", this.handleDownClick);
  }

  removeEventListeners() {
    this.shadowRoot
      .getElementById("listSelectorUpBtn")
      .removeEventListener("click", this.handleUpClick);
    this.shadowRoot
      .getElementById("listSelectorDownBtn")
      .removeEventListener("click", this.handleDownClick);
  }

  handleUpClick(event) {
    event.stopPropagation();
    if (this.selectedIndex > 0) {
      this.selectedIndex--;
      this.render();
      this.dispatchChangeEvent();
    }
  }

  handleDownClick(event) {
    event.stopPropagation();
    if (this.selectedIndex < this.items.length - 1) {
      this.selectedIndex++;
      this.render();
      this.dispatchChangeEvent();
    }
  }

  dispatchChangeEvent() {
    const event = new CustomEvent("change", {
      bubbles: true,
      detail: { selectedItem: this.items[this.selectedIndex] },
    });
    this.dispatchEvent(event);
  }

  getCurrentValue() {
    return this.items[this.selectedIndex];
  }
}

customElements.define("list-item-selector", ListItemSelector);
export { ListItemSelector };
