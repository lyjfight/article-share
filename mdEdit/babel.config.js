const presets = [
  ["@babel/preset-env", {
    "useBuiltIns": "usage",
    "corejs": 3
  }],
]
const plugins = [
]

if(process.env.NODE_ENV !== 'production') {
}

module.exports = {
  presets,
  plugins
}