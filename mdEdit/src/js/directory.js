(function() {
  setTimeout(() => {
    const markdownBody = document.getElementsByClassName('markdown-body')[0]
    const directoryArr = []
    const directoryAllowTagMap = {
      'H1': true,
      'H2': true,
      'H3': true,
      'H4': true,
      'H5': true,
      'H6': true,
    }
    Array.from(markdownBody.children).forEach(item => {
      if(directoryAllowTagMap[item.tagName]) {
        directoryArr.push({
          tag: item.tagName,
          text: item.innerText,
          id: item.id,
          level: item.tagName.slice(1)
        })
      }
    })
    const directoryContent = document.createElement('div')
    directoryContent.className = 'directoryContent'
    directoryArr.forEach(item => {
      const a = document.createElement('a')
      a.className = 'directoryItem'
      a.href = '#' + item.id
      a.innerText = item.text
      a.style.paddingLeft = item.level * 12 + 'px'
      directoryContent.appendChild(a)
    })
    directoryContent.onclick = function(event) {
      const e = event || window.event
      Array.from(directoryContent.children).forEach(a => {
        a.classList.remove('checked')
      })
      e.target.classList.add('checked')
    }
    document.body.appendChild(directoryContent)
  }, 0)
})()