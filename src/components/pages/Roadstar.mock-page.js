import carBackgroundSmallImage from "../../assets/images/hero-image.png";
import carBackgroundImage from "../../assets/images/hero-image@2x.png";

// THIS IS JUST A MOCK COMPONENT TO SHOW THAT THE SINGLE PAGE ROUTING WORKS

class Roadstar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <main class="main">
        <div class="main-intro">
          <img class="main-intro-background" src="${carBackgroundImage}" 
          srcset="${carBackgroundSmallImage} 800w, ${carBackgroundImage} 1600w" 
          alt="Tesla S background image" />
          <h1 style="color: white;position: absolute;top: 30%;left: 47%;">This is a Page for Roadstar</h1>
        </div>
      </main>
      `;
  }
}

customElements.define("roadstar-page", Roadstar);
export { Roadstar };
