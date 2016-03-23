import path from 'path';
import assert from 'power-assert';
import API, { loadResources } from '../../server/api';

describe('loadResources()', () => {
  it('should resolve each pathes', () => {
    const resourcesPath = path.resolve(__dirname, '../../', process.env.RESOURCES);
    const resources = loadResources(resourcesPath);

    assert(resources.materials !== undefined);
    assert(resources.materials.length > 0);
    assert(resources.materials[0].path !== undefined);
    assert(resources.materials[0].path.startsWith('./materials') === false);

    assert(resources.sources !== undefined);
    assert(resources.sources.length > 0);
    assert(resources.sources[0].path !== undefined);
    assert(resources.sources[0].path.startsWith('./sources') === false);
  });
});

describe('/api', () => {
  it('/materials', async () => {
    const ret = {};
    await API.materials(ret);

    assert(ret.status === 200);
    assert(ret.body.length === 2);
    assert(ret.body[0].id === 'aaa');
    assert(ret.body[0].name === 'bbb');
    assert(ret.body[0].lang === 'en');
    assert(ret.body[0].sections === '1-2');
    assert(ret.body[0].path === undefined);
  });

  it('/sources', async () => {
    const ret = {};
    await API.sources(ret);

    assert(ret.status === 200);
    assert(ret.body.length === 1);
    assert(ret.body[0].id === 'aaa');
    assert(ret.body[0].name === 'bbb');
    assert(ret.body[0].lang === 'en');
    assert(ret.body[0].path === undefined);
  });

  it('/presets', async () => {
    const ret = {};
    await API.presets(ret);

    assert(ret.status === 200);
    assert(Object.keys(ret.body).length > 0);
    assert(ret.body.en !== undefined);
    assert(typeof ret.body.en.sentenceSeparator === 'string');
  });
});
