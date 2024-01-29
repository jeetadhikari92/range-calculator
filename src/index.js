import "./styles/main.scss";
import { NavBar } from "./components/shared/nav-bar";
import teslaLogo from "./assets/images/logo.png";
import { TeslaSPage } from "./components/pages/TeslaS.page";
import { Model3 } from "./components/pages/Model3.mock-page";
import { ModelX } from "./components/pages/ModelX.mock-page";
import { Roadstar } from "./components/pages/Roadstar.mock-page"
import { Energy } from "./components/pages/energy.mock-page"

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
  spaRouter.addRoute("/roadstar", Roadstar);
  spaRouter.addRoute("/energy", Energy);

  navBarInstance.addEventListener("change", (event) => {
    spaRouter.navigateTo(event.detail.href);
  });

  console.log(window.innerWidth);
});
