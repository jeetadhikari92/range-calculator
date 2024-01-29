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

  addRoute(path, lazyLoadCallback) {
    this.routes.push({ path, lazyLoadCallback });
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

  async navigateTo(path) {
    const route = this.findRoute(path);

    if (route) {
      this.currentRoute = route;
      await this.lazyLoadAndRenderComponent(route.lazyLoadCallback);
    } else {
      console.error(`Route not found for path: ${path}`);
    }
  }

  findRoute(path) {
    return this.routes.find((route) => route.path === path);
  }

  async lazyLoadAndRenderComponent(lazyLoadCallback) {
    const appContainer = document.getElementById("app");
    appContainer.innerHTML = "";

    const component = await lazyLoadCallback();
    const componentInstance = new component();
    const componentElement =
      componentInstance instanceof HTMLElement
        ? componentInstance
        : document.createElement("div");

    appContainer.appendChild(componentElement);
  }
}

customElements.define("spa-router", SPARouterComponent);
export { SPARouterComponent };
