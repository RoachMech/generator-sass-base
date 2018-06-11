'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(`Welcome to the primo ${chalk.red('generator-sass-base')} generator!`)
    );

    const prompts = [];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.propName;
      this.props = props;
    });
  }

  installingNpmDependencies() {
    // Install ES Lint Libraries
    this.npmInstall(
      [
        '@swis/eslint-config',
        'eslint',
        'babel-eslint',
        'eslint-plugin-import',
        'eslint-plugin-node',
        'eslint-plugin-promise',
        'eslint-plugin-standard'
      ],
      {
        'save-dev': true
      }
    );

    // Install Style Lint Libraries
    this.npmInstall(['@swis/stylelint-config', 'stylelint-order', 'stylelint-scss'], {
      'save-dev': true
    });

    // Install SASS Libraries
    this.npmInstall(['sass-rhythm', 'sass-rem', 'breakpoint-sass']);
  }

  writing() {
    // ES Lint files and scripts
    this.fs.copy(this.templatePath('.eslintrc.js'), this.destinationPath('.eslintrc.js'));
    this.fs.extendJSON('package.json', {
      scripts: {
        'lint:js':
          'cross-env NODE_ENV=production eslint --ext=.js,.vue --format=node_modules/eslint-friendly-formatter resources/assets/js/ resources/assets/__tests__/',
        'fix:js':
          'cross-env NODE_ENV=production eslint --ext=.js,.vue --format=node_modules/eslint-friendly-formatter --fix resources/assets/js/ resources/assets/__tests__/'
      }
    });

    // Style Lint files and scripts
    this.fs.copy(this.templatePath('.stylelintrc'), this.destinationPath('.stylelintrc'));
    this.fs.extendJSON('package.json', {
      scripts: {
        'lint:css': 'stylelint --syntax=scss "**/*.scss" "resources/assets/js/**/*.vue"',
        'fix:css': 'stylelint --syntax=scss --fix "**/*.scss"'
      }
    });

    // Combine Lint scripts
    this.fs.extendJSON('package.json', {
      scripts: {
        lint: 'npm run lint:css & npm run lint:js',
        fix: 'npm run fix:css & npm run fix:js'
      }
    });
  }

  install() {
    this.installDependencies({
      bower: false
    });
  }
};
