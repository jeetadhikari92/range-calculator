import "./styles/main.scss";
import { NavBar } from "./components/shared/nav-bar.js";
import teslaLogo from "./assets/images/logo.png";
import { TeslaSPage } from "./components/pages/TeslaS.page";
import { Model3 } from "./components/pages/Model3.mock-page.js";
import { ModelX } from "./components/pages/ModelX.mock-page.js";

document.addEventListener("DOMContentLoaded", () => {
  const topbarLogoEl = document.getElementById("logo");
  topbarLogoEl.src = teslaLogo;

  const headerEl = document.getElementById("header");
  const navBarInstance = new NavBar();
  headerEl.appendChild(navBarInstance);

  const spaRouter = document.querySelector("spa-router");

  spaRouter.addRoute("/", TeslaSPage);
  spaRouter.addRoute("/modelx", ModelX);
  spaRouter.addRoute("/model3", Model3);
  spaRouter.addRoute("/roadstar", TeslaSPage);
  spaRouter.addRoute("/energy", TeslaSPage);

  navBarInstance.addEventListener("change", (event) => {
    spaRouter.navigateTo(event.detail.href);
  });

  console.log(window.innerWidth);
});
