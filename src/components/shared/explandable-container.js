import chevronDownSvg from "../../assets/images/icon-chevron-down.svg";

class ExpandableContainer extends HTMLElement {
  constructor() {
    super();
    this.showContent = false;
    this.attachShadow({ mode: "open" });

    this.onExpandableContainerBtnClick =
      this.onExpandableContainerBtnClick.bind(this);
  }

  connectedCallback() {
    this.render();
    this.addEventListeners();
  }

  render() {
    this.shadowRoot.innerHTML = `
            <style>
                .expandable-container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }
                .expandable-container-btn {
                    width: 75px;
                    height: 75px;
                    border-radius: 100px;
                    border: 1px solid black;
                    background-image: url(${chevronDownSvg});
                    background-repeat: no-repeat;
                    background-position: center;
                    background-size: 35px;
                    cursor: pointer; /* Moved hover effect to this rule */
                    transition: transform 0.3s ease;
                }
                .expandable-container-content {
                    width: 100%;
                    margin-top: 2rem;
                    display: none;
                    transition: opacity 0.3s ease;
                }
            </style>

            <section id="expandable-container" class="expandable-container">
                <button id="expandable-container-btn" class="expandable-container-btn" aria-expanded="false" aria-controls="expandable-container-content"></button>
                <section id="expandable-container-content" class="expandable-container-content">
                    <slot></slot>
                </section>
            </section>
        `;
  }

  addEventListeners() {
    this.shadowRoot
      .getElementById("expandable-container-btn")
      .addEventListener("click", this.onExpandableContainerBtnClick);
  }

  removeEventListener() {
    this.shadowRoot
      .getElementById("expandable-container-btn")
      .removeEventListener("click", this.onExpandableContainerBtnClick);
  }

  onExpandableContainerBtnClick(event) {
    event.stopPropagation();
    const expandableBtnEl = this.shadowRoot.getElementById(
      "expandable-container-btn",
    );
    const expandableContentEl = this.shadowRoot.getElementById(
      "expandable-container-content",
    );

    this.showContent = !this.showContent;

    if (this.showContent) {
      expandableContentEl.style.display = "block";
      expandableContentEl.style.opacity = 1;
      expandableBtnEl.style.transform = "rotate(180deg)";
      expandableBtnEl.ariaExpanded = true;
    } else {
      expandableContentEl.style.opacity = 0;
      setTimeout(() => {
        expandableContentEl.style.display = "none";
      }, 300);
      expandableBtnEl.style.transform = "none";
      expandableBtnEl.ariaExpanded = false;
    }
    this.dispatchToggleEvent();
  }

  dispatchToggleEvent() {
    const event = new CustomEvent("toggle", {
      detail: { showContent: this.showContent },
    });
    this.dispatchEvent(event);
  }

  scrollToBottom() {
    const containerEl = this.shadowRoot.getElementById("expandable-container");
    if (containerEl) {
      const containerRect = containerEl.getBoundingClientRect();
      setTimeout(() => {
        window.scrollTo({
          top: containerRect.top + window.scrollY,
          behavior: "smooth",
        });
      }, 200)
    }
  }
}

customElements.define("expandable-container", ExpandableContainer);
