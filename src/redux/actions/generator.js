/* eslint-disable max-len */
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
      type: actions.EMIT_ERROR,
      payload: {
        name: 'Load Error',
        message: 'Failed to fetch the materials list. Please contact with the server administrator.',
        details: err,
      },
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
      type: actions.EMIT_ERROR,
      payload: {
        name: 'Load Error',
        message: 'Failed to fetch the sources list. Please contact with the server administrator.',
        details: err,
      },
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
      type: actions.EMIT_ERROR,
      payload: {
        name: 'Load Error',
        message: 'Failed to fetch the presets list. Please contact with the server administrator.',
        details: err,
      },
    }));
}

export function generate(settings) {
  const {
    target,
    sources,
    format,
    advanced,
  } = settings;
  const data = {
    material: target.material.get('id'),
    sections: target.sections,
    lang: target.material.get('lang'),
    sources: sources.toArray(),
    ...format.toObject(),
    ...advanced.toObject(),
  };

  data.size = data.size_;

  // Validate sources here because <Table> has no validation methods.
  if (sources.isEmpty()) {
    return {
      type: actions.EMIT_ERROR,
      payload: {
        name: 'Settings Error',
        message: 'You should select at least one of the sources.',
        details: {},
      },
    };
  }

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
        dispatch({
          type: actions.EMIT_ERROR,
          payload: {
            name: 'Generator Runtime Error (code 1)',
            message: 'Failed to generate questions. Please go back to the settings page and check your configurations.',
            details: { ...res },
          },
        });
        return;
      }

      if (!res.questions.length) {
        dispatch({
          type: actions.EMIT_ERROR,
          payload: {
            name: 'Generator Runtime Error (code 2)',
            message: 'Failed to generate questions. Please go back to the settings page and check your configurations.',
            details: {},
          },
        });
        return;
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
      type: actions.EMIT_ERROR,
      payload: {
        name: 'Generator Runtime Error (code 3)',
        message: 'Failed to generate questions. Please go back to the settings page and check your configurations.',
        details: err,
      },
    }));
}

export function clearQuiz() {
  return {
    type: actions.CLEAR_QUIZ,
  };
}
