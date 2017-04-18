module.exports = {
  transform: './node_modules/lab-espower-transformer',
  lint: false,
  verbose: true,
  leaks: true,
  globals: '__core-js_shared__', // came from power-assert
}