import camelCase from 'camel-case';
import { Record, List, fromJS } from 'immutable';

const Quiz = new Record({
  title: '',
  instruction: '',
  answerKeysLabel: '',
  questions: new List(),
}, 'quiz');

const ACTIONS_MAP = {
  clearQuiz(state) {
    return state
      .delete('title')
      .delete('instruction')
      .delete('answerKeysLabel')
      .delete('questions');
  },

  populateQuiz(state, {
    title,
    instruction,
    answerKeysLabel,
    questions,
  }) {
    return state
      .set('title', title)
      .set('instruction', instruction)
      .set('answerKeysLabel', answerKeysLabel)
      .set('questions', fromJS(questions));
  },
};

const initialState = new Quiz();

export default function quiz(state = initialState, { type, payload }) {
  const reducer = ACTIONS_MAP[camelCase(type)];

  return (reducer) ? reducer(state, payload) : state;
}

// For transit-immutable-js
export const records = [Quiz];
