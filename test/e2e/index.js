import assert from 'power-assert';
import Nightmare from 'nightmare';
import savedData from '../fixtures/localstorage';

const URI = 'http://127.0.0.1:8080/';
const GENERATE_PAGE_LANDMARK = 'div[title="Target"]';
const PREVIEW_PAGE_LANDMARK = '[class^="index__quiz___"]';
const GENERATE_BUTTON = '[class*="index__toolbar___"] button';
const CANCEL_BUTTON = '[class*="index__toolbar___"] > div > div:first-child > button';

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
  }
);

const n = new Nightmare({
  x: 0,
  y: 0,
  show: process.env.NODE_ENV === 'development',
  waitTimeout: 3000,
});

after(async () => {
  await n.evaluate(() => {
    window.localStorage.clear();
  });
  await n.end();
});

describe('The app', () => {
  it('should be able to be accessed', async () => {
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

  it('should generate a quiz', async () => {
    await n.clickMaterialUI(GENERATE_BUTTON);
    await n.wait(PREVIEW_PAGE_LANDMARK);

    const url = await n.url();
    assert(url.endsWith('/preview') === true);

    const title = await n.evaluate(() => {
      const quiz = document.querySelector('[class^="index__quiz___"]');
      return quiz.querySelector(':scope > h2:first-child').textContent;
    });
    assert(title === 'Quiz Title');

    const instruction = await n.evaluate(() => {
      const quiz = document.querySelector('[class^="index__quiz___"]');
      return quiz.querySelector(':scope > p').textContent;
    });
    assert(instruction === 'Instruction');

    const questionsNum = await n.evaluate(() => {
      const quiz = document.querySelector('[class^="index__quiz___"]');
      const questions = quiz.querySelector(':scope > ol');
      return questions.querySelectorAll(':scope > li').length;
    });
    assert(questionsNum === 1);

    const qSentence = await n.evaluate(() => {
      const quiz = document.querySelector('[class^="index__quiz___"]');
      const questions = quiz.querySelector(':scope > ol');
      const question = questions.querySelector(':scope > li');
      const sentence = question.querySelector(':scope > span:first-child');
      return sentence.textContent;
    });
    assert(qSentence === "Well, I've wrote this sentence as a test.");

    const underlinedWordsNum = await n.evaluate(() => {
      const quiz = document.querySelector('[class^="index__quiz___"]');
      const questions = quiz.querySelector(':scope > ol');
      const question = questions.querySelector(':scope > li');
      const sentence = question.querySelector(':scope > span:first-child');
      const underlined = sentence.querySelectorAll(':scope u');
      return underlined.length;
    });
    assert(underlinedWordsNum === 1);

    const underlinedWord = await n.evaluate(() => {
      const quiz = document.querySelector('[class^="index__quiz___"]');
      const questions = quiz.querySelector(':scope > ol');
      const question = questions.querySelector(':scope > li');
      const sentence = question.querySelector(':scope > span:first-child');
      const underlined = sentence.querySelectorAll(':scope u');
      return underlined[0].textContent;
    });
    assert(underlinedWord.includes('test') === true);

    const quizTitleInAnswers = await n.evaluate(() => {
      const quiz = document.querySelector('[class^="index__quiz___"]');
      return quiz
        .querySelector('[class^="index__quizTitleInAnswerKeys"]')
        .textContent;
    });
    assert(quizTitleInAnswers === 'Quiz Title');

    const titleInAnswers = await n.evaluate(() => {
      const quiz = document.querySelector('[class^="index__quiz___"]');
      return quiz
        .querySelector('[class^="index__quizTitleInAnswerKeys"] + span')
        .textContent;
    });
    assert(titleInAnswers === 'Answer Keys');

    const answersNum = await n.evaluate(() => {
      const quiz = document.querySelector('[class^="index__quiz___"]');
      const answersRoot = quiz.querySelectorAll(':scope > ol')[1];
      return answersRoot.querySelectorAll(':scope > li').length;
    });
    assert(answersNum === 1);
  });

  it('should return to /generate when the Cancel button is clicked', async () => {
    await n.clickMaterialUI(CANCEL_BUTTON);
    await n.wait(GENERATE_PAGE_LANDMARK);

    const url = await n.url();
    assert(url.endsWith('/generate') === true);
  });
});
