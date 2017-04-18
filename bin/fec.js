#!/usr/bin/env node

const argv  = require('yargs')
const {version} = require('../package')
const fec = require('..')

argv
  .command(
    ['parse <file>', '*'],
    'Parse provided file and generate valid equivalent',
    {
      output: {
        alias: 'o',
        demandOption: true,
        describe: 'Path of generated file'
      }
    },
    argv => fec(argv.file, argv.output).catch(err => {
      console.error(err.cause)
      process.exit(-1)
    })
  )
  .demandCommand()
  .help()
  .argv
