class SPARouterComponent extends HTMLElement {
  constructor() {
    super();

    this.routes = [];
    this.currentRoute = null;
    this.initialLoadDone = false;
  }

  connectedCallback() {
    this.render();
    this.addEventListeners();
  }

  disconnectedCallback() {
    this.removeEventListeners();
  }

  addRoute(path, component) {
    this.routes.push({ path, component });
  }

  render() {
    this.innerHTML = `
        <div id="app"></div>
    `;
  }

  addEventListeners() {
    window.addEventListener("popstate", this.handleNavigation.bind(this));
    document.addEventListener(
      "DOMContentLoaded",
      this.handleInitialLoad.bind(this),
    );
  }

  removeEventListeners() {
    window.removeEventListener("popstate", this.handleNavigation.bind(this));
    document.removeEventListener(
      "DOMContentLoaded",
      this.handleInitialLoad.bind(this),
    );
  }

  handleInitialLoad() {
    this.initialLoadDone = true;
    const initialPath = window.location.pathname;
    this.navigateTo(initialPath);
  }

  handleNavigation() {
    if (this.initialLoadDone) {
      const path = window.location.pathname;
      this.navigateTo(path);
    }
  }

  navigateTo(path) {
    const route = this.findRoute(path);

    if (route) {
      this.currentRoute = route;
      this.renderComponent(route.component);
    } else {
      console.error(`Route not found for path: ${path}`);
    }
  }

  findRoute(path) {
    return this.routes.find((route) => route.path === path);
  }

  renderComponent(component) {
    const appContainer = document.getElementById("app");
    appContainer.innerHTML = "";

    const componentElement = new component();
    appContainer.appendChild(componentElement);
  }
}

customElements.define("spa-router", SPARouterComponent);
