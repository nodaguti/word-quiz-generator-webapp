import 'isomorphic-fetch';
import checkStatus from 'fetch-check-http-status';
import actions from 'constants/actions';

const SERVER_URL = '/api';
const parse = (res) => res.json();

export function fetchAllMaterials() {
  return (dispatch) =>
    fetch(`${SERVER_URL}/materials`, {
      method: 'GET',
    })
    .then(parse)
    .then((materials) => dispatch({
      type: actions.FETCH_ALL_MATERIALS,
      payload: { materials },
    }))
    .catch((err) => dispatch({
      type: actions.FETCH_ALL_MATERIALS,
      payload: err,
      error: true,
    }));
}

export function fetchAllSources() {
  return (dispatch) =>
    fetch(`${SERVER_URL}/sources`, {
      method: 'GET',
    })
    .then(checkStatus)
    .then(parse)
    .then((sources) => dispatch({
      type: actions.FETCH_ALL_SOURCES,
      payload: { sources },
    }))
    .catch((err) => dispatch({
      type: actions.FETCH_ALL_SOURCES,
      payload: err,
      error: true,
    }));
}

export function fetchAllPresets() {
  return (dispatch) =>
    fetch(`${SERVER_URL}/presets`, {
      method: 'GET',
    })
    .then(checkStatus)
    .then(parse)
    .then((presets) => dispatch({
      type: actions.FETCH_ALL_PRESETS,
      payload: { presets },
    }))
    .catch((err) => dispatch({
      type: actions.FETCH_ALL_PRESETS,
      payload: err,
      error: true,
    }));
}

export function generate(setting) {
  const {
    target,
    sources,
    format,
    advanced,
  } = setting;
  const data = {
    material: target.material.get('id'),
    sections: target.sections,
    lang: target.material.get('lang'),
    sources: sources.toArray(),
    ...format.toObject(),
    ...advanced.toObject(),
  };

  data.size = data.size_;

  return (dispatch) =>
    fetch(`${SERVER_URL}/quiz`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(checkStatus)
    .then(parse)
    .then((res) => {
      if (!res.success) {
        throw new Error(res.message);
      }

      dispatch({
        type: actions.POPULATE_QUIZ,
        payload: {
          ...format.toObject(),
          questions: res.questions,
        },
      });
    })
    .catch((err) => dispatch({
      type: actions.POPULATE_QUIZ,
      payload: err,
      error: true,
    }));
}

export function clearQuiz() {
  return {
    type: actions.CLEAR_QUIZ,
  };
}
