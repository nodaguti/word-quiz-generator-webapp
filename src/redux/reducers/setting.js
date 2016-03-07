import camelCase from 'camel-case';
import { Record, List, Map } from 'immutable';

const Target = new Record({
  material: new Map(),
  sections: '',
}, 'setting-target');

const Format = new Record({
  title: '',
  size_: 10,  // 'size' causes an error in Immutable.js.
              // https://github.com/facebook/immutable-js/issues/377
  instruction: '',
  answerKeysLabel: '',
}, 'setting-format');

const Advanced = new Record({
  sentenceSeparator: '',
  clauseRegExp: '',
  wordRegExp: '',
  wordBoundaryRegExp: '',
  abbrRegExp: '',
}, 'setting-advanced');

const Setting = new Record({
  target: new Target(),
  sources: new List(),  // @type {List<String>} list of source IDs
  format: new Format(),
  advanced: new Advanced(),
}, 'setting');

const ACTIONS_MAP = {
  updateMaterial(state, { material }) {
    return state.setIn(['target', 'material'], material);
  },

  updateSections(state, { sections }) {
    return state.setIn(['target', 'sections'], sections);
  },

  updateSources(state, { sources }) {
    return state.set('sources', sources);
  },

  clearSelectedSources(state) {
    return state.delete('sources');
  },

  updateFormat(state, formatProps) {
    return Object
      .keys(formatProps)
      .filter((key) => formatProps[key] !== undefined)
      .reduce((newState, key) =>
        newState.setIn(['format', key], formatProps[key])
      , state);
  },

  updateAdvanced(state, advancedProps) {
    return Object
      .keys(advancedProps)
      .filter((key) => advancedProps[key] !== undefined)
      .reduce((newState, key) =>
        newState.setIn(['advanced', key], advancedProps[key])
      , state);
  },

  clearAdvanced(state) {
    return state.delete('advanced');
  },
};

const initialState = new Setting();

export default function setting(state = initialState, { type, payload }) {
  const reducer = ACTIONS_MAP[camelCase(type)];

  return (reducer) ? reducer(state, payload) : state;
}

// For transit-immutable-js
export const records = [Target, Format, Advanced, Setting];
