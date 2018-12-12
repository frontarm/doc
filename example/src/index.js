import React from 'react'
import ReactDOM from 'react-dom'
import * as Navi from 'navi'
import './index.css'
import App from './App'


let pages = Navi.createSwitch({
  paths: {
    '/': Navi.createPage({
      title: 'Home',
      content: '',
    })
  }
})


let navigation = Navi.createBrowserNavigation({ pages })


ReactDOM.render(<App navigation={navigation} />, document.getElementById('root'))
