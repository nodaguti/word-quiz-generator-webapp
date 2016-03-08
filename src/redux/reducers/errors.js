import camelCase from 'camel-case';
import { Record, List } from 'immutable';

const ImmutableError = new Record({
  name: 'Unexpected Error',
  // eslint-disable-next-line max-len
  message: 'Unexpected error has occurred. Please reload the page. Your data is automatically saved to your computer, and may be recovered after reloading.',
  details: {
    name: '',
    message: '',
    stack: '',
  },
}, 'error');

const ACTIONS_MAP = {
  emitError(state, { name, message, stack, details }) {
    return state.push(new ImmutableError({ name, message, stack, details }));
  },

  dismissError(state) {
    return state.pop();
  },
};

const initialState = new List();

export default function resources(state = initialState, { type, payload }) {
  const reducer = ACTIONS_MAP[camelCase(type)];

  return (reducer) ? reducer(state, payload) : state;
}

// For transit-immutable-js
export const records = [ImmutableError];
