'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-sass-base:app', () => {
  beforeAll(() => {
    return helpers.run(path.join(__dirname, '../generators/app'));
  });

  it('creates ES Lint config file', () => {
    assert.file(['.eslintrc.js']);
  });

  it('creates Style Lint config file', () => {
    assert.file(['.stylelintrc']);
  });
});
