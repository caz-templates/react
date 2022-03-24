// @ts-check

const path = require('path')
const { name, version } = require('./package.json')

/** @type {import('caz').Template} */
module.exports = {
  name,
  version,
  metadata: {
    // TODO: predefined template metadata
    year: new Date().getFullYear()
  },
  prompts: [
    // TODO: custom template prompts
    {
      name: 'name',
      type: 'text',
      message: 'Project name'
    },
    {
      name: 'version',
      type: 'text',
      message: 'Project version'
    },
    {
      name: 'description',
      type: 'text',
      message: 'Project description',
      initial: 'Awesome react apps.'
    },
    {
      name: 'author',
      type: 'text',
      message: 'Project author name'
    },
    {
      name: 'email',
      type: 'text',
      message: 'Project author email'
    },
    {
      name: 'url',
      type: 'text',
      message: 'Project author url'
    },
    {
      name: 'github',
      type: 'text',
      message: 'GitHub username or organization',
      initial: 'zce'
    },
    {
      name: 'features',
      type: 'multiselect',
      message: 'Choose the features you need',
      instructions: false,
      choices: [
        { title: 'Automatic test', value: 'test', selected: true }
      ]
    },
    {
      name: 'install',
      type: 'confirm',
      message: 'Install dependencies',
      initial: true
    },
    {
      name: 'pm',
      type: prev => process.env.NODE_ENV === 'test' || prev ? 'select' : null,
      message: 'Package manager',
      hint: ' ',
      choices: [
        { title: 'npm', value: 'npm' },
        { title: 'pnpm', value: 'pnpm' },
        { title: 'yarn', value: 'yarn' }
      ]
    }
  ],
  filters: {
    // TODO: custom template filters
    /** @param {{ features: string[] }} answers */
    'src/*.test.js': answers => answers.features.includes('test'),
    'src/setupTests.js': answers => answers.features.includes('test')
  },
  helpers: {
    // TODO: custom template helpers
    upper: input => input.toUpperCase()
  },
  setup: async ctx => {
    ctx.config.install = ctx.answers.install && ctx.answers.pm
  },
  complete: async ctx => {
    // TODO: custom complete callback
    console.clear()
    console.log(`Created a new project in ${ctx.project} by the ${ctx.template} template.\n`)
    console.log('Getting Started:')
    if (ctx.dest !== process.cwd()) {
      console.log(`  $ cd ${path.relative(process.cwd(), ctx.dest)}`)
    }
    if (ctx.config.install === false) {
      console.log('  $ npm install')
    }
    console.log(`  $ ${ctx.config.install ? ctx.config.install : 'npm'} run start`)
    console.log('\nHappy hacking :)\n')
  }
}
