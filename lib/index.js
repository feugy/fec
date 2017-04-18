const {promisify, promisifyAll} = require('bluebird')
const {parseAsync: parse, stringifyAsync: stringify} = promisifyAll(require('csv'))
const {readFileAsync: readFile, writeFileAsync: writeFile} = promisifyAll(require('fs'))
const mkdirp = promisify(require('mkdirp'))
const {dirname} = require('path')

const transform = writing => {
  writing.Montantdevise = writing.Montantdevise || ''
  writing.Idevise = writing.Idevise || ''
  return writing
}

module.exports = async (file, output, delimiter = '\t') => {
  // read & parse input file, considering the first line as header line
  const content = await readFile(file, 'utf8')
  const parsed = await parse(content, {
    columns: true,
    delimiter,
    relax_column_count: true,
    skip_empty_lines: true
  })
  // generate equivalent
  const generated = await stringify(parsed.map(transform), {
    header: true,
    delimiter: '|'
  })
  // creates output folders and write result
  await mkdirp(dirname(output))
  await writeFile(output, generated, 'utf8')
  return `written in ${output}`
}
