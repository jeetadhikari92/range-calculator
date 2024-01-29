import "./styles/main.scss";
import { NavBar } from "./components/shared/nav-bar";
import teslaLogo from "./assets/images/logo.png";

document.addEventListener("DOMContentLoaded", () => {
  const topbarLogoEl = document.getElementById("logo");
  topbarLogoEl.src = teslaLogo;

  const headerEl = document.getElementById("header");
  const navBarInstance = new NavBar();
  headerEl.appendChild(navBarInstance);

  const spaRouter = document.querySelector("spa-router");

  spaRouter.addRoute("/", async () => {
    await import("./components/pages/TeslaS.page");
    return customElements.get("tesla-s-page");
  });
  spaRouter.addRoute("/modelx", async () => {
    await import("./components/pages/ModelX.mock-page");
    return customElements.get("model-x");
  });
  spaRouter.addRoute("/model3", async () => {
    await import("./components/pages/Model3.mock-page");
    return customElements.get("model-3-page");
  });
  spaRouter.addRoute("/roadstar", async () => {
    await import("./components/pages/Roadstar.mock-page");
    return customElements.get("roadstar-page");
  });
  spaRouter.addRoute("/energy", async () => {
    await import("./components/pages/energy.mock-page");
    return customElements.get("energy-page");
  });

  navBarInstance.addEventListener("change", (event) => {
    spaRouter.navigateTo(event.detail.href);
  });

  console.log(window.innerWidth);
});
