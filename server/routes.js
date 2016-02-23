/**
 * Server-side routing
 */

import fs from 'fs-extra-promise';
import route from 'koa-route';
import path from 'path';
import QuizAPI from './api';

const indexPath = path.resolve(__dirname, '../index.html');
let indexPage;

/* eslint-disable no-param-reassign */
const serveHome = async (ctx) => {
  if (!indexPage) {
    indexPage = await fs.readFileAsync(indexPath, 'utf8');
  }

  ctx.body = indexPage;
  ctx.type = 'text/html';
  ctx.status = 200;
};

export default function (app) {
  app.use(route.get('/api/materials', QuizAPI.materials));
  app.use(route.get('/api/sources', QuizAPI.sources));
  app.use(route.get('/api/presets', QuizAPI.presets));
  app.use(route.post('/api/quiz', QuizAPI.quiz));
  app.use(route.get('/(.*)', serveHome));
}
