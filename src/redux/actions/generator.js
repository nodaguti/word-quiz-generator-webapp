/* eslint-disable max-len */
import 'isomorphic-fetch';
import checkStatus from 'fetch-check-http-status';
import actions from 'constants/actions';
import i18n from 'i18n';

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
        name: i18n.t('errors.failToLoadMaterials.name'),
        message: i18n.t('errors.failToLoadMaterials.message'),
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
        name: i18n.t('errors.failToLoadSources.name'),
        message: i18n.t('errors.failToLoadSources.message'),
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
        name: i18n.t('errors.failToLoadPresets.name'),
        message: i18n.t('errors.failToLoadPresets.message'),
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
        name: i18n.t('errors.noSelectedSources.name'),
        message: i18n.t('errors.noSelectedSources.message'),
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
            name: i18n.t('errors.brokenSuccessFlag.name'),
            message: i18n.t('errors.brokenSuccessFlag.message'),
            details: { ...res },
          },
        });
        return;
      }

      if (!res.questions.length) {
        dispatch({
          type: actions.EMIT_ERROR,
          payload: {
            name: i18n.t('errors.noGeneratedQuestions.name'),
            message: i18n.t('errors.noGeneratedQuestions.message'),
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
        name: i18n.t('errors.unknownGeneratorError.name'),
        message: i18n.t('errors.unknownGeneratorError.message'),
        details: err,
      },
    }));
}

export function clearQuiz() {
  return {
    type: actions.CLEAR_QUIZ,
  };
}
