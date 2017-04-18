const {promisify} = require('bluebird')
const assert = require('power-assert')
const Lab = require('lab')
const {resolve, join} = require('path')
const rimraf = promisify(require('rimraf'))
const fec = require('../')

exports.lab = Lab.script()
const {describe, it, beforeEach, after} = exports.lab

const fixtures = resolve(__dirname, 'fixtures')
const validFile = join(fixtures, 'one-line.csv')
const invalidFile = join(fixtures, 'catalog.xml')
const output = resolve(fixtures, 'output')

describe('Fec parser', () => {

  const cleanOutput = () => rimraf(output)

  beforeEach(cleanOutput)
  after(cleanOutput)

  it('should report unexisting file', () =>
    fec('unknown').then(
      res => assert.fail(res),
      err => assert.ok(err.message.includes('no such file'))
    )
  )

  it('should report unparsable file', () =>
    fec(invalidFile).then(
      res => assert.fail(res),
      err => assert.ok(err.message.includes('Invalid opening quote at line 1'))
    )
  )

  it('should creates missing output folders', () =>
    fec(validFile, join(fixtures, 'output', 'out.csv'))
  )
})
