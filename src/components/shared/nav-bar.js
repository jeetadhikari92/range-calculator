class NavBar extends HTMLElement {
  connectedCallback() {
    this.render();
    this.addEventListeners();
  }

  render() {
    this.innerHTML = `
        <nav class="nav-bar">
          <ul>
            <li><a href="/">Model S</a></li>
            <li><a href="/modelx">Model X</a></li>
            <li><a href="/model3">Model 3</a></li>
            <li><a href="/roadstar">Roadstar</a></li>
            <li><a href="/energy">Energy</a></li>
          </ul>
        </nav>
      `;
  }

  addEventListeners() {
    const aTags = document.querySelectorAll(".nav-bar>ul>li>a");
    aTags.forEach((aTag) =>
      aTag.addEventListener("click", this.onLinkSelect.bind(this)),
    );
  }

  onLinkSelect(event) {
    event.preventDefault();
    const href = event.currentTarget.getAttribute("href");
    window.history.pushState({}, "", href);
    this.dispatchEvent(new CustomEvent("change", { detail: { href } }));
  }
}

customElements.define("nav-bar", NavBar);
export { NavBar };
