// const purgecss = require('@fullhuman/postcss-purgecss')
module.exports = {
  plugins: [
    'postcss-preset-env',
    // purgecss({ 
    //   content: [ 
    //     "./src/**/*.css"
    //   ], 
    //   whitelist: ["html", "body"], 
    //   whitelistPatternsChildren: [/^token/, /^pre/, /^code/], 
    // })
  ]
}