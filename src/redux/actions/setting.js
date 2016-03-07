import actions from 'constants/actions';

export function updateMaterial({ material, isLangUpdated }) {
  return (dispatch) => {
    dispatch({
      type: actions.UPDATE_MATERIAL,
      payload: { material },
    });

    if (isLangUpdated) {
      dispatch({
        type: actions.CLEAR_SELECTED_SOURCES,
      });
      dispatch({
        type: actions.CLEAR_ADVANCED,
      });
    }
  };
}

export function updateSections(sections) {
  return {
    type: actions.UPDATE_SECTIONS,
    payload: { sections },
  };
}

export function updateSources(sources) {
  return {
    type: actions.UPDATE_SOURCES,
    payload: { sources },
  };
}

export function clearSources() {
  return {
    type: actions.CLEAR_SELECTED_SOURCES,
  };
}

export function updateFormat({
  title,
  size,
  instruction,
  answerKeysLabel,
}) {
  return {
    type: actions.UPDATE_FORMAT,
    payload: {
      title,
      size_: size,
      instruction,
      answerKeysLabel,
    },
  };
}

export function updateAdvanced({
  sentenceSeparator,
  clauseRegExp,
  wordRegExp,
  wordBoundaryRegExp,
  abbrRegExp,
}) {
  return {
    type: actions.UPDATE_ADVANCED,
    payload: {
      sentenceSeparator,
      clauseRegExp,
      wordRegExp,
      wordBoundaryRegExp,
      abbrRegExp,
    },
  };
}
