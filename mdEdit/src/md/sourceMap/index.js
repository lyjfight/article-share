import mdContent from './index.md'
// import 'highlight.js/styles/atom-one-dark.css'
import '@/css/hightlight.css'
import '@/css/markdown.css'

const div = document.createElement('div')
div.className = 'markdown-body'
div.innerHTML = mdContent
document.body.appendChild(div)

