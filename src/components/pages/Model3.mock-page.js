import carBackgroundSmallImage from "../../assets/images/hero-image.png";
import carBackgroundImage from "../../assets/images/hero-image@2x.png";

// THIS IS JUST A MOCK COMPONENT TO SHOW THAT THE SINGLE PAGE ROUTING WORKS

class Model3 extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <main class="main">
        <div class="main-intro">
          <img class="main-intro-background" src="${carBackgroundImage}" 
          srcset="${carBackgroundSmallImage} 800w, ${carBackgroundImage} 1600w" 
          alt="Tesla S background image" />
          <h1 style="color: white;position: absolute;top: 30%;left: 47%;">And This is a Page for Model 3</h1>
        </div>
      </main>
      `;
  }
}

customElements.define("model-3-page", Model3);
export { Model3 };
