import { NavBar } from "../components/shared/nav-bar";

describe("NavBar", () => {
  let navBar;

  beforeEach(() => {
    navBar = new NavBar();
    document.body.appendChild(navBar);
  });

  afterEach(() => {
    document.body.removeChild(navBar);
  });

  test("handles link selection", () => {
    const links = navBar.querySelectorAll("a");
    const linkToSelect = links[1];

    const dispatchEventSpy = jest.spyOn(navBar, "dispatchEvent");

    navBar.onLinkSelect({
      currentTarget: linkToSelect,
      preventDefault: jest.fn(),
    });

    expect(dispatchEventSpy).toHaveBeenCalledWith(expect.any(CustomEvent));
    expect(dispatchEventSpy.mock.calls[0][0].type).toBe("change");
    expect(dispatchEventSpy.mock.calls[0][0].detail).toEqual({
      href: linkToSelect.getAttribute("href"),
    });

    dispatchEventSpy.mockRestore();
  });

  test('dispatches "change" event with correct href', () => {
    const links = navBar.querySelectorAll("a");
    const linkToSelect = links[2];
    const dispatchEventMock = jest.fn();

    navBar.dispatchEvent = dispatchEventMock;

    // mocking event object here
    navBar.onLinkSelect({
      currentTarget: linkToSelect,
      preventDefault: jest.fn(),
    });

    expect(dispatchEventMock).toHaveBeenCalledWith(
      new CustomEvent("change", {
        detail: { href: linkToSelect.getAttribute("href") },
      }),
    );
  });
});
