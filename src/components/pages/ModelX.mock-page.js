import carBackgroundSmallImage from "../../assets/images/hero-image.png";
import carBackgroundImage from "../../assets/images/hero-image@2x.png";

// THIS IS JUST A MOCK COMPONENT TO SHOW THAT THE SINGLE PAGE ROUTING WORKS

class ModelX extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <div class="main-intro">
          <img class="main-intro-background" src="${carBackgroundImage}" 
          srcset="${carBackgroundSmallImage} 800w, ${carBackgroundImage} 1600w" 
          alt="Tesla S background image" />
          <h1 style="color: white;position: absolute;top: 30%;left: 47%;">This is a Page for Model X</h1>
        </div>
      `;
  }


  a() {
    console.log(1+ 1)
  }
}

customElements.define("model-x", ModelX);
export { ModelX };
