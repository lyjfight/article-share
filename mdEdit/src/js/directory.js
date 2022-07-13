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


    const fullScreen = document.createElement('div')
    fullScreen.innerHTML = '+'
    fullScreen.className = 'fullScreen'
    fullScreen.onclick = function() {
      if (!window.fullScreen) {
        window.fullScreen = true
        fullScreen.innerHTML = '-'
        if(document.documentElement.RequestFullScreen){
          document.documentElement.RequestFullScreen();
        }
        //兼容火狐
        console.log(document.documentElement.mozRequestFullScreen)
        if(document.documentElement.mozRequestFullScreen){
          document.documentElement.mozRequestFullScreen();
        }
        //兼容谷歌等可以webkitRequestFullScreen也可以webkitRequestFullscreen
        if(document.documentElement.webkitRequestFullScreen){
          document.documentElement.webkitRequestFullScreen();
        }
        //兼容IE,只能写msRequestFullscreen
        if(document.documentElement.msRequestFullscreen){
          document.documentElement.msRequestFullscreen();
        }
      } else {
        window.fullScreen = false
        fullScreen.innerHTML = '+'
        if(document.exitFullScreen){
          document.exitFullscreen()
        }
        //兼容火狐
        console.log(document.mozExitFullScreen)
        if(document.mozCancelFullScreen){
          document.mozCancelFullScreen()
        }
        //兼容谷歌等
        if(document.webkitExitFullscreen){
          document.webkitExitFullscreen()
        }
        //兼容IE
        if(document.msExitFullscreen){
          document.msExitFullscreen()
        }
      }
    }
    document.body.appendChild(fullScreen)
  }, 0)
})()