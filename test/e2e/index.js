import assert from 'power-assert';
import Nightmare from 'nightmare';
import savedData from '../fixtures/localstorage';

const URI = 'http://127.0.0.1:8080/';

/**
 * Click an element of material-ui.
 * material-ui uses `mouseup` to listen user's clicks.
 */
Nightmare.action(
  'clickMaterialUI',
  function clickMaterialUI(selector, done) {
    this.evaluate_now((sel) => {
      const element = document.querySelector(sel);
      const event = document.createEvent('MouseEvent');
      event.initEvent('mouseup', true, true);
      element.dispatchEvent(event);
    }, done, selector);
  },
);

const n = new Nightmare({
  x: 0,
  y: 0,
  show: process.env.NODE_ENV === 'development',
  waitTimeout: 10000,
});

after(async () => {
  await n.evaluate(() => {
    window.localStorage.clear();
  });
  await n.end();
});

describe('The app', () => {
  it('should be accessible', async () => {
    let err;

    try {
      await n.goto(URI);
      await n.wait('#root');
    } catch (e) {
      err = e;
    } finally {
      assert(err === undefined);
    }
  });

  it('should initialize React components', async () => {
    const exists = await n.exists('main');
    assert(exists === true);
  });

  it('should load a saved data in the local storage', async () => {
    await n.evaluate((data) => {
      window.localStorage.setItem('redux', data);
    }, JSON.stringify(savedData.redux));
    await n.refresh();
    await n.wait('input[value="Quiz Title"]');
  });
});
