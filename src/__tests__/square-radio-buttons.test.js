import { SquareRadioButtons } from "../components/shared/square-radio-buttons";

const itemsMock = JSON.stringify(["Option 1", "Option 2", "Option 3"]);

describe("SquareRadioButtons", () => {
  let squareRadioButtons;

  beforeEach(() => {
    squareRadioButtons = new SquareRadioButtons();
    document.body.appendChild(squareRadioButtons);
  });

  afterEach(() => {
    document.body.removeChild(squareRadioButtons);
  });

  test("renders buttons based on items attribute", () => {
    squareRadioButtons.setAttribute("items", itemsMock);
    const buttons = squareRadioButtons.shadowRoot.querySelectorAll("button");
    expect(buttons.length).toBe(3);
  });

  test("applies custom styles", () => {
    const customStylesMock = '{"color": "red", "font-size": "16px"}';
    squareRadioButtons.setAttribute("custom-styles", customStylesMock);

    const buttons = squareRadioButtons.shadowRoot.querySelectorAll("button");
    buttons.forEach((button) => {
      expect(button.style.color).toBe("red");
      expect(button.style.fontSize).toBe("16px");
    });
  });

  test("sets selected button on click", () => {
    squareRadioButtons.setAttribute("items", itemsMock);
    const buttons = squareRadioButtons.shadowRoot.querySelectorAll("button");

    buttons[1].click();

    expect(buttons[1].classList.contains("selected")).toBe(true);
    expect(buttons[1].getAttribute("aria-checked")).toBe("true");
  });

  test("triggers change event on button click", () => {
    squareRadioButtons.setAttribute("items", itemsMock);
    const buttons = squareRadioButtons.shadowRoot.querySelectorAll("button");

    const mockChangeHandler = jest.fn();
    squareRadioButtons.addEventListener("change", mockChangeHandler);

    buttons[2].click();

    expect(mockChangeHandler).toHaveBeenCalledWith(
      expect.objectContaining({ detail: "Option 3" }),
    );
  });
});
