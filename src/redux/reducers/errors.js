import camelCase from 'camel-case';
import { Record, List } from 'immutable';
import i18n from 'i18n';

const ImmutableError = new Record({
  name: i18n.t('errors.unexpected.name'),
  message: i18n.t('errors.unexpected.message'),
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
