import { AcSwitch } from "../components/shared/ac-switch";
describe("AcSwitch", () => {
  let acSwitch;

  beforeEach(() => {
    acSwitch = new AcSwitch();
    document.body.appendChild(acSwitch);
  });

  afterEach(() => {
    document.body.removeChild(acSwitch);
  });

  test("renders with default state", () => {
    expect(acSwitch.shadowRoot).toBeTruthy();
    expect(acSwitch.isOn).toBe(false);
    expect(acSwitch.isHeating).toBe(false);

    const switchButton = acSwitch.shadowRoot.querySelector(".ac-btn-outer");
    expect(switchButton).toBeTruthy();
  });

  test("toggles state on click", () => {
    expect(acSwitch.isOn).toBe(false);

    acSwitch.click();

    expect(acSwitch.isOn).toBe(true);

    acSwitch.click();

    expect(acSwitch.isOn).toBe(false);
  });

  test("updates state on heating attribute change", () => {
    expect(acSwitch.isHeating).toBe(false);

    acSwitch.setAttribute("heating", "true");

    expect(acSwitch.isHeating).toBe(true);

    acSwitch.setAttribute("heating", "false");

    expect(acSwitch.isHeating).toBe(false);
  });

  test("changes text based on isOn and heating states", () => {
    expect(
      acSwitch.shadowRoot.querySelector(".ac-btn-content-text").textContent,
    ).toBe("AC OFF");

    acSwitch.toggle();
    expect(
      acSwitch.shadowRoot.querySelector(".ac-btn-content-text").textContent,
    ).toBe("AC ON");

    acSwitch.setAttribute("heating", "true");
    expect(
      acSwitch.shadowRoot.querySelector(".ac-btn-content-text").textContent,
    ).toBe("HEAT ON");

    acSwitch.toggle();
    expect(
      acSwitch.shadowRoot.querySelector(".ac-btn-content-text").textContent,
    ).toBe("HEAT OFF");

    acSwitch.setAttribute("heating", "false");
    expect(
      acSwitch.shadowRoot.querySelector(".ac-btn-content-text").textContent,
    ).toBe("AC OFF");
  });
});
