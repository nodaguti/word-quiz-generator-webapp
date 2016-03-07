import camelCase from 'camel-case';
import { Record, List, Map, fromJS } from 'immutable';

const Resources = new Record({
  materials: new List(),
  sources: new List(),
  presets: new Map(),
}, 'resources');

const ACTIONS_MAP = {
  fetchAllMaterials(state, { materials }) {
    return state.set('materials', fromJS(materials));
  },

  fetchAllSources(state, { sources }) {
    return state.set('sources', fromJS(sources));
  },

  fetchAllPresets(state, { presets }) {
    return state.set('presets', new Map(presets));
  },
};

const initialState = new Resources();

export default function resources(state = initialState, { type, payload }) {
  const reducer = ACTIONS_MAP[camelCase(type)];

  return (reducer) ? reducer(state, payload) : state;
}

// For transit-immutable-js
export const records = [Resources];
