import { SPARouterComponent } from '../components/shared/spa-router-component';

describe('SPARouterComponent', () => {
  let router;

  beforeEach(() => {
    router = new SPARouterComponent();
    document.body.appendChild(router);
  });

  afterEach(() => {
    document.body.removeChild(router);
  });

  test('adds a route', () => {
    const path = '/test';
    const component = jest.fn();

    router.addRoute(path, component);

    expect(router.routes).toEqual([{ path, component }]);
  });

  test('navigates to a route', () => {
    const path = '/test';
    const component = jest.fn();
    router.addRoute(path, component);

    router.navigateTo(path);

    expect(router.currentRoute).toEqual({ path, component });
    expect(document.getElementById('app').innerHTML).not.toBe('');
  });

  test('handles navigation on initial load', () => {
    const path = '/';
    const component = jest.fn();
    router.addRoute(path, component);

    router.handleInitialLoad();

    expect(router.currentRoute).toEqual({ path, component });
    expect(document.getElementById('app').innerHTML).not.toBe('');
  });

});
