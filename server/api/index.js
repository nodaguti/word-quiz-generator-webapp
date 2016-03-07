/* eslint-disable no-param-reassign, no-console */
import cloneDeep from 'lodash/cloneDeep';
import QuizGenerator, { RegExpPresets } from 'word-quiz-generator';
import path from 'path';
import _ from 'lodash';

function loadResources(_path) {
  const root = path.dirname(_path);
  const resources = require(_path);

  resources.materials.forEach((item) => {
    item.path = path.resolve(root, item.path);
  });
  resources.sources.forEach((item) => {
    item.path = path.resolve(root, item.path);
  });

  return resources;
}

/**
 * Build a new resources that is safe to expose to the Web.
 * @param {Object} resources an original resources JSON object.
 * @return {Object}
 */
function buildSafeResources(resources) {
  const safeResources = cloneDeep(resources);
  const presets = cloneDeep(RegExpPresets);

  safeResources.materials.forEach((item) => delete item.path);
  safeResources.sources.forEach((item) => delete item.path);
  safeResources.presets = JSON.parse(
    JSON.stringify(presets, (k, v) => _.isRegExp(v) ? v.source : v)
  );

  return safeResources;
}


const projectHome = path.resolve(__dirname, '../../');
const resourcesPath = path.resolve(projectHome, process.env.RESOURCES || 'resources.json');
const resources = loadResources(resourcesPath);
const safeResources = buildSafeResources(resources);

console.log(`The resources are loaded from ${resourcesPath}`);

export default {
  async materials(ctx) {
    ctx.body = safeResources.materials;
    ctx.status = 200;
  },

  async sources(ctx) {
    ctx.body = safeResources.sources;
    ctx.status = 200;
  },

  async presets(ctx) {
    ctx.body = safeResources.presets;
    ctx.status = 200;
  },

  async quiz(ctx) {
    try {
      const {
        lang,
        sections,
        size,
      } = ctx.request.body;
      let {
        material,
        sources,
        sentenceSeparator,
        clauseRegExp,
        wordRegExp,
        wordBoundaryRegExp,
        abbrRegExp,
      } = ctx.request.body;

      material = resources
        .materials
        .find((item) => item.id === material)
        .path;
      sources = sources
        .map((id) => resources
          .sources
          .find((item) => item.id === id)
          .path
        )
        .join(',');
      sentenceSeparator =
        sentenceSeparator && new RegExp(sentenceSeparator, 'g');
      clauseRegExp =
        clauseRegExp && new RegExp(clauseRegExp, 'g');
      wordRegExp =
        wordRegExp && new RegExp(wordRegExp, 'g');
      wordBoundaryRegExp =
        wordBoundaryRegExp && new RegExp(wordBoundaryRegExp);
      abbrRegExp =
        abbrRegExp && new RegExp(abbrRegExp, 'g');

      const generator = new QuizGenerator({
        material,
        sources,
        lang,
        sentenceSeparator,
        clauseRegExp,
        wordRegExp,
        wordBoundaryRegExp,
        abbrRegExp,
      });

      await generator.init();

      const questions = await generator.quiz({ sections, size });

      ctx.body = { success: true, questions };
      ctx.status = 200;
    } catch (err) {
      console.error(err.stack);
      ctx.body = {
        success: false,
        name: err.name,
        message: err.message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : '',
      };
      ctx.status = 500;
    }
  },
};
