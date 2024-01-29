import { ListItemSelector } from "../components/shared/list-item-selector";

const mockedItems = ["Item 1", "Item 2", "Item 3"];

describe("ListItemSelector", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  test("renders with default data and styles", () => {
    const listItemSelector = new ListItemSelector();
    document.body.appendChild(listItemSelector);

    expect(
      listItemSelector.shadowRoot.querySelector(".list-item-selector"),
    ).toBeTruthy();
  });

  test("renders with mocked items and selected index", () => {
    const listItemSelector = new ListItemSelector();
    listItemSelector.setAttribute("items", JSON.stringify(mockedItems));

    // Setting it as one, so that we can use both up and down buttons.
    listItemSelector.setAttribute("selected-index", "1");
    document.body.appendChild(listItemSelector);

    const renderedValue = listItemSelector.shadowRoot.querySelector(
      ".list-item-selector-value",
    ).textContent;
    expect(renderedValue).toBe("Item 2");
  });

  test('handles click on "Move Up" button', () => {
    const listItemSelector = new ListItemSelector();
    listItemSelector.setAttribute("items", JSON.stringify(mockedItems));
    listItemSelector.setAttribute("selected-index", "1");
    document.body.appendChild(listItemSelector);

    listItemSelector.shadowRoot.getElementById("listSelectorUpBtn").click();

    const renderedValue = listItemSelector.shadowRoot.querySelector(
      ".list-item-selector-value",
    ).textContent;
    expect(renderedValue).toBe("Item 1");
  });

  test('handles click on "Move Down" button', () => {
    const listItemSelector = new ListItemSelector();
    listItemSelector.setAttribute("items", JSON.stringify(mockedItems));
    listItemSelector.setAttribute("selected-index", "1");
    document.body.appendChild(listItemSelector);

    listItemSelector.shadowRoot.getElementById("listSelectorDownBtn").click();

    const renderedValue = listItemSelector.shadowRoot.querySelector(
      ".list-item-selector-value",
    ).textContent;
    expect(renderedValue).toBe("Item 3");
  });
});
