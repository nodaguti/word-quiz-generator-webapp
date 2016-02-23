/* eslint-disable no-param-reassign, no-console */

import cloneDeep from 'lodash/cloneDeep';
import QuizGenerator from 'word-quiz-generator/lib/quiz-generator';
import path from 'path';

const resourcesPath =
  (process.env.RESOURCES && path.resolve(process.env.RESOURCES)) ||
  path.resolve(__dirname, '../../resources.json');
const resourcesDir = path.dirname(resourcesPath);
const resources = require(resourcesPath);

resources.materials.forEach((item) => {
  item.path = path.resolve(resourcesDir, item.path);
});

resources.sources.forEach((item) => {
  item.path = path.resolve(resourcesDir, item.path);
});

const safeResource = cloneDeep(resources);
safeResource.materials.forEach((item) => delete item.path);
safeResource.sources.forEach((item) => delete item.path);

export default {

  async materials(ctx) {
    ctx.body = safeResource.materials;
    ctx.status = 200;
  },

  async sources(ctx) {
    ctx.body = safeResource.sources;
    ctx.status = 200;
  },

  async presets(ctx) {
    ctx.body = safeResource.presets;
    ctx.status = 200;
  },

  async quiz(ctx) {
    try {
      console.log({ ...ctx.request.body });

      const {
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

      console.log({
        material, sources, sentenceSeparator, clauseRegExp, wordRegExp,
        wordBoundaryRegExp, abbrRegExp,
      });

      const generator = new QuizGenerator({
        material, sources, sentenceSeparator, clauseRegExp, wordRegExp,
        wordBoundaryRegExp, abbrRegExp,
      });

      await generator.init();
      const questions = await generator.quiz({ sections, size });

      ctx.body = { success: true, questions };
      ctx.status = 200;
    } catch (err) {
      console.error(err.stack);
      ctx.body = {
        success: false,
        message: err.message,
      };
      ctx.status = 500;
    }
  },

};
