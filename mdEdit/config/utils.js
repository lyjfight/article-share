const path = require('path')
const glob = require('glob')

const resolve = (src) => {
  return path.resolve(process.cwd(), src)
}

const getEntry = function (globPath) {
  var entries = {}
  var pathname
  glob.sync(globPath).forEach(function (entry) {
    console.log(entry)
    pathname = entry.match(/\/src\/md\/(.+index)(.html|.js|.md)/)[1]
    entries[pathname] = entry
  })
  // console.log(entries)
  return entries
}

module.exports = {
  resolve,
  getEntry
}