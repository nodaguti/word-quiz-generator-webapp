import 'source-map-support/register';
import Koa from 'koa';
import convert from 'koa-convert';
import mount from 'koa-mount';
import serve from 'koa-static';
import compress from 'koa-compress';
import parseJSON from 'koa-parse-json';
import logger from 'koa-logger';
import path from 'path';
import routes from './routes.js';

const app = new Koa();
const ip =
  process.env.OPENSHIFT_NODEJS_IP ||
  process.env.IP ||
  '127.0.0.1';
const port =
  process.env.OPENSHIFT_NODEJS_PORT ||
  process.env.PORT ||
  8080;

app.use(convert(logger()));
app.use(convert(compress()));
app.use(convert(parseJSON()));
app.use(convert(mount('/assets', serve(path.join(__dirname, '../assets')))));
routes(app);

/* eslint-disable no-console */
if (!module.parent) {
  app.listen(port, ip, () => {
    console.log(`Now the app is running on http://${ip}:${port}`);
  });
}
